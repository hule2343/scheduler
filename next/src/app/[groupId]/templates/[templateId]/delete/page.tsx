'use client'
import axios from "@/axios";
import DeleteConfirmForm from "@/components/form/DeleteConfirmForm";
export default function TemplateDelete({
  params,
}: {
  params: { groupId: string; templateId: string };
}) {
  const handleSubmit = () => {
    axios
      .delete(`/${params.groupId}/templates/${params.templateId}`)
      .then((res) => {})
      .catch((err) => {});
  };
  return (
    <DeleteConfirmForm
      onSubmit={handleSubmit}
      redirect={`/${params.groupId}/templates`}
    />
  );
}
