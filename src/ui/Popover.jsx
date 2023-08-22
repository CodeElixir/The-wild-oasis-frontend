import { forwardRef, useCallback, useEffect, useRef } from "react";

export function getOffsetTop(rect, vertical) {
  let offset = 0;

  if (typeof vertical === "number") {
    offset = vertical;
  } else if (vertical === "center") {
    offset = rect.height / 2;
  } else if (vertical === "bottom") {
    offset = rect.height;
  }

  return offset;
}

export function getOffsetLeft(rect, horizontal) {
  let offset = 0;

  if (typeof horizontal === "number") {
    offset = horizontal;
  } else if (horizontal === "center") {
    offset = rect.width / 2;
  } else if (horizontal === "right") {
    offset = rect.width;
  }

  return offset;
}

function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical]
    .map((n) => (typeof n === "number" ? `${n}px` : n))
    .join(" ");
}

function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}

const Popover = forwardRef(function Popover(inProps, ref) {
  const {
    action,
    anchorEl,
    anchorOrigin = {
      vertical: "top",
      horizontal: "left",
    },
    anchorPosition,
    anchorReference = "anchorEl",
    children,
    className,
    container: containerProp,
    marginThreshold = 16,
    open,
    transformOrigin = {
      vertical: "top",
      horizontal: "left",
    },
    TransitionComponent = null,
    transitionDuration = "auto",
    TransitionProps: { onEntering, ...TransitionProps } = {},
    ...other
  } = inProps;

  const eleRef = useRef();

  // Returns the top/left offset of the position
  // to attach to on the anchor element (or body if none is provided)
  const getAnchorOffset = useCallback(() => {
    if (anchorReference === "anchorPosition") {
      if (process.env.NODE_ENV !== "production") {
        if (!anchorPosition) {
          console.error(
            "You need to provide a `anchorPosition` prop when using " +
              '<Popover anchorReference="anchorPosition" />.',
          );
        }
      }
      return anchorPosition;
    }

    const resolvedAnchorEl = resolveAnchorEl(anchorEl);

    // If an anchor element wasn't provided, just use the parent body element of this Popover
    const anchorElement =
      resolvedAnchorEl && resolvedAnchorEl.nodeType === 1
        ? resolvedAnchorEl
        : document.body;
    const anchorRect = anchorElement.getBoundingClientRect();

    if (process.env.NODE_ENV !== "production") {
      const box = anchorElement.getBoundingClientRect();

      if (
        process.env.NODE_ENV !== "test" &&
        box.top === 0 &&
        box.left === 0 &&
        box.right === 0 &&
        box.bottom === 0
      ) {
        console.warn(
          [
            "The `anchorEl` prop provided to the component is invalid.",
            "The anchor element should be part of the document layout.",
            "Make sure the element is present in the document or that it's not display none.",
          ].join("\n"),
        );
      }
    }

    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left:
        anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
    };
  }, [
    anchorEl,
    anchorOrigin.horizontal,
    anchorOrigin.vertical,
    anchorPosition,
    anchorReference,
  ]);

  // Returns the base transform origin using the element
  const getTransformOrigin = useCallback(
    (elemRect) => {
      return {
        vertical: getOffsetTop(elemRect, transformOrigin.vertical),
        horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal),
      };
    },
    [transformOrigin.horizontal, transformOrigin.vertical],
  );

  const getPositioningStyle = useCallback(
    (element) => {
      const elemRect = {
        width: element.offsetWidth,
        height: element.offsetHeight,
      };

      // Get the transform origin point on the element itself
      const elemTransformOrigin = getTransformOrigin(elemRect);

      if (anchorReference === "none") {
        return {
          top: null,
          left: null,
          transformOrigin: getTransformOriginValue(elemTransformOrigin),
        };
      }

      // Get the offset of the anchoring element
      const anchorOffset = getAnchorOffset();

      // Calculate element positioning
      let top = anchorOffset.top - elemTransformOrigin.vertical;
      let left = anchorOffset.left - elemTransformOrigin.horizontal;
      const bottom = top + elemRect.height;
      const right = left + elemRect.width;

      // Use the parent window of the anchorEl if provided
      const containerWindow =
        (resolveAnchorEl(anchorEl) &&
          resolveAnchorEl(anchorEl).ownerDocument) ||
        document;

      // Window thresholds taking required margin into account
      const heightThreshold = containerWindow.innerHeight - marginThreshold;
      const widthThreshold = containerWindow.innerWidth - marginThreshold;

      // Check if the vertical axis needs shifting
      if (top < marginThreshold) {
        const diff = top - marginThreshold;
        top -= diff;
        elemTransformOrigin.vertical += diff;
      } else if (bottom > heightThreshold) {
        const diff = bottom - heightThreshold;
        top -= diff;
        elemTransformOrigin.vertical += diff;
      }

      if (process.env.NODE_ENV !== "production") {
        if (
          elemRect.height > heightThreshold &&
          elemRect.height &&
          heightThreshold
        ) {
          console.error(
            [
              "The popover component is too tall.",
              `Some part of it can not be seen on the screen (${
                elemRect.height - heightThreshold
              }px).`,
              "Please consider adding a `max-height` to improve the user-experience.",
            ].join("\n"),
          );
        }
      }

      // Check if the horizontal axis needs shifting
      if (left < marginThreshold) {
        const diff = left - marginThreshold;
        left -= diff;
        elemTransformOrigin.horizontal += diff;
      } else if (right > widthThreshold) {
        const diff = right - widthThreshold;
        left -= diff;
        elemTransformOrigin.horizontal += diff;
      }

      return {
        top: `${Math.round(top)}px`,
        left: `${Math.round(left)}px`,
        transformOrigin: getTransformOriginValue(elemTransformOrigin),
      };
    },
    [
      anchorEl,
      anchorReference,
      getAnchorOffset,
      getTransformOrigin,
      marginThreshold,
    ],
  );

  const setPositioningStyles = useCallback(() => {
    const element = eleRef.current;

    if (!element) {
      return;
    }

    const positioning = getPositioningStyle(element);

    if (positioning.top !== null) {
      element.style.top = positioning.top;
    }
    if (positioning.left !== null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
  }, [getPositioningStyle]);

  const handleEntering = (element, isAppearing) => {
    if (onEntering) {
      onEntering(element, isAppearing);
    }

    setPositioningStyles();
  };

  useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  });

  return (
    <div
      ref={eleRef}
      className="absolute max-h-8 min-h-[1rem] min-w-[1rem] max-w-[2rem] overflow-y-auto overflow-x-hidden"
    >
      SASASAS
    </div>
  );
});

export default Popover;
