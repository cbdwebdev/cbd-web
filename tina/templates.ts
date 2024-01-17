import type { TinaField } from "tinacms";
export function postFields(): TinaField[] {
  return [
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
    },
    {
      type: "string",
      name: "description",
      label: "Description",
    },
    {
      type: "image",
      name: "images",
      label: "Images",
      list: true,
    },
    {
      type: "string",
      name: "video",
      label: "Youtube Link",
    },
  ];
}
