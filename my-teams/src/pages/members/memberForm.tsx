import { Input, Button, Divider, RadioGroup, Radio } from "@heroui/react";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

import { MemberFormValues, MemberRole } from "@/types/members";
import { MEMBERS_LIST_PATH } from "@/routes";

export default function MemberForm({
  roleOptions,
  initialValues,
  onSubmit,
  isEditMode,
  onDelete,
}: {
  roleOptions: MemberRole[];
  initialValues?: MemberFormValues;
  onSubmit: (values: MemberFormValues) => void;
  isEditMode?: boolean;
  onDelete?: () => void;
}) {
  const navigate = useNavigate();

  return (
    <Formik
      enableReinitialize
      initialValues={
        initialValues ?? {
          name: "",
          lastname: "",
          email: "",
          phone: "",
          role: "1",
        }
      }
      onSubmit={onSubmit}
    >
      {({ handleChange, setFieldValue, values }) => (
        <Form className="w-full max-w-xs flex flex-col gap-4">
          <Input
            isRequired
            errorMessage="Please enter a valid Name"
            label="Name"
            labelPlacement="outside"
            name="name"
            placeholder="Enter name"
            type="text"
            value={values.name}
            onChange={handleChange}
          />
          <Input
            isRequired
            errorMessage="Please enter a valid Lastname"
            label="Lastname"
            labelPlacement="outside"
            name="lastname"
            placeholder="Enter lastname"
            type="text"
            value={values.lastname}
            onChange={handleChange}
          />
          <Input
            isRequired
            errorMessage="Please enter a valid email"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter email"
            type="email"
            value={values.email}
            onChange={handleChange}
          />
          <Input
            isRequired
            errorMessage="Please enter a valid phone number (10 digits)"
            label="Phone"
            labelPlacement="outside"
            name="phone"
            placeholder="Enter phone number"
            type="tel"
            validate={(value) => {
              if (value.length != 10) {
                return "Please enter a valid phone number (10 digits)";
              }
            }}
            value={values.phone}
            onChange={handleChange}
          />
          <Divider />
          <RadioGroup
            label="Select Role"
            value={values.role}
            onChange={(e) => setFieldValue("role", e.target.value)}
          >
            {roleOptions.map((role) => (
              <Radio key={role.id} value={role.id.toString()}>
                {role.name}
              </Radio>
            ))}
          </RadioGroup>
          <div className="flex gap-4 mt-4">
            {isEditMode && (
              <Button className="flex-1" color="danger" onPress={onDelete}>
                Delete
              </Button>
            )}
            <Button className="flex-1" color="primary" type="submit">
              Save
            </Button>
          </div>
          <Button
            color="primary"
            variant="light"
            onPress={() => navigate(MEMBERS_LIST_PATH)}
          >
            Return to List
          </Button>
        </Form>
      )}
    </Formik>
  );
}
