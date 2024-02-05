import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";
import Button from "../../ui/Button/Button";
import FileInput from "../../ui/Input/FileInput";
import Input from "../../ui/Input/Input";
import TextArea from "../../ui/Input/TextArea";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal = () => {} }) {
  const { id: editCabinId, ...editCabinValues } = cabinToEdit;
  const isEditCabin = Boolean(editCabinId);
  const { createCabin, isCreating } = useCreateCabin();
  const { editCabin, isEditing } = useEditCabin();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: isEditCabin ? editCabinValues : {},
  });

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditCabin) {
      editCabin(
        {
          cabinData: { ...data, image },
          id: editCabinId,
          imageId: editCabinValues["image"],
        },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        },
      );
    } else {
      createCabin(
        { cabinData: { ...data, image }, id: null },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        },
      );
    }
  };

  const isLoading = isCreating || isEditing;

  return (
    <form
      className="grid grid-cols-1 gap-y-6 overflow-hidden rounded-xl bg-white p-4 text-sm dark:bg-gray-900 dark:text-gray-200"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        id="name"
        name="name"
        label="Cabin Name"
        type="text"
        {...register("name", {
          required: "This field is required.",
        })}
        errors={errors}
        disabled={isLoading}
      />
      <Input
        id="maxCapacity"
        name="maxCapacity"
        label="Maximum capacity"
        type="number"
        {...register("maxCapacity", {
          required: "This field is required.",
          min: {
            value: 1,
            message: "Capacity should be atleast 1",
          },
        })}
        errors={errors}
        disabled={isLoading}
      />
      <Input
        id="regularPrice"
        name="regularPrice"
        label="Regular price"
        type="number"
        {...register("regularPrice", {
          required: "This field is required.",
        })}
        errors={errors}
        disabled={isLoading}
      />
      <Input
        id="discount"
        name="discount"
        label="Discount"
        type="number"
        defaultValue={0}
        {...register("discount", {
          required: "This field is required.",
          validate: (value) => {
            return (
              parseInt(value, 10) < parseInt(getValues().regularPrice, 10) ||
              "Discount should be less than regular price."
            );
          },
        })}
        errors={errors}
        disabled={isLoading}
      />
      <TextArea
        id="description"
        name="description"
        label="Description for website"
        defaultValue={""}
        {...register("description", {
          required: "This field is required.",
        })}
        errors={errors}
        disabled={isLoading}
      />
      <FileInput
        id="image"
        name="image"
        label="Cabin photo"
        accept="image/*"
        {...register("image", {
          required: isEditCabin ? false : "This field is required.",
        })}
        errors={errors}
        disabled={isLoading}
      />
      <div className="flex items-center justify-end gap-3">
        <Button secondary type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditCabin ? "Edit Cabin" : "Add Cabin"}
        </Button>
      </div>
    </form>
  );
}

export default CreateCabinForm;
