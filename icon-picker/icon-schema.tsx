import { ColorPickerInput } from "./color";
import { IconPickerInput } from "./icon";

export const iconSchema = {
    type: "object",
    label: "Icon",
    name: "icon",
    fields: [
        {
            type: "string",
            label: "Icon",
            name: "name",
            ui: {
                component: IconPickerInput,
            },
        },
        {
            type: "string",
            label: "Color",
            name: "color",
            ui: {
                component: ColorPickerInput,
            },
        },
        {
            name: "style",
            label: "Style",
            type: "string",
            options: [
                {
                    label: "Circle",
                    value: "circle",
                },
                {
                    label: "Float",
                    value: "float",
                },
            ],
        },
    ],
};
