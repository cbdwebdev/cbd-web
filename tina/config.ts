import { TinaField, defineConfig } from "tinacms";

import { postFields } from "./templates";

// Your hosting provider likely exposes this as an environment variable
const branch =
    process.env.GITHUB_BRANCH ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD ||
    "main";
console.log("BRANCH", branch)

const stringParamsFields = (names: string[]): TinaField[] =>
    names.map((name) => ({
        name,
        label: capitalizeFirst(name),
        type: "string",
    }));

const capitalizeFirst = (s: string): string =>
    s.charAt(0).toUpperCase() + s.slice(1);

export default defineConfig({
    branch,

    // Get this from tina.io
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    // Get this from tina.io
    token: process.env.TINA_TOKEN,

    client: { skip: true },
    build: {
        outputFolder: "admin",
        publicFolder: "static",
    },
    media: {
        tina: {
            mediaRoot: "",
            publicFolder: "static",
        },
    },
    // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
    schema: {
        collections: [
            {
                format: "md",
                label: "About",
                name: "about",
                path: "content/about",
                frontmatterFormat: "yaml",
                frontmatterDelimiters: "---",
                match: {
                    include: "*",
                },
                fields: [
                    {
                        type: "string",
                        name: "title",
                        description: "Title of the page",
                    },
                    {
                        type: "string",
                        name: "description",
                        description: "Description of the page",
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body of Document",
                        description: "This is the markdown body",
                        isBody: true,
                    },
                ],
                ui: {
                    allowedActions: {
                        create: false,
                    },
                },
            },
            {
                format: "md",
                label: "Our Work",
                name: "our_work",
                path: "content/ourwork",
                frontmatterFormat: "toml",
                frontmatterDelimiters: "+++",
                match: {
                    include: "*",
                },
                fields: [
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body of Document",
                        description: "This is the markdown body",
                        isBody: true,
                    },
                    ...postFields(),
                ],
            },
            {
                format: "md",
                label: "Inventory",
                name: "inventory",
                path: "content/inventory",
                frontmatterFormat: "toml",
                frontmatterDelimiters: "+++",
                match: {
                    include: "*",
                },
                fields: [
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body of Document",
                        description: "This is the markdown body",
                        isBody: true,
                    },
                    ...postFields(),
                ],
            },
            {
                format: "yml",
                label: "Data",
                name: "data",
                path: "data",
                frontmatterFormat: "toml",
                frontmatterDelimiters: "+++",
                match: {
                    include: "*",
                },
                fields: [
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body of Document",
                        description: "This is the markdown body",
                        isBody: true,
                    },
                ],
            },
            {
                format: "md",
                label: "Contact",
                name: "contact",
                path: "content/contact",
                frontmatterFormat: "toml",
                frontmatterDelimiters: "+++",
                match: {
                    include: "*",
                },
                fields: [
                    {
                        type: "string",
                        name: "title",
                        description: "Title of the page",
                    },
                    {
                        type: "string",
                        name: "description",
                        description: "Description of the page",
                    },
                    {
                        type: "rich-text",
                        name: "body",
                        label: "Body of Document",
                        description: "This is the markdown body",
                        isBody: true,
                    },
                ],
                ui: {
                    allowedActions: {
                        create: false,
                    },
                },
            },
            {
                format: "toml",
                label: "Configuration",
                name: "configuration",
                path: "/",
                frontmatterFormat: "toml",
                frontmatterDelimiters: "+++",
                ui: {
                    allowedActions: {
                        create: false,
                        delete: false,
                    },
                },
                match: {
                    include: "config",
                },
                fields: [
                    {
                        type: "string",
                        name: "title",
                        label: "Title",
                    },
                    {
                        label: "Params",
                        name: "params",
                        type: "object",
                        fields: stringParamsFields([
                            "address",
                            "email",
                            "author",
                            "copyright",
                            "description",
                            "fax",
                            "phone",
                        ]),
                    },
                ],
            },
        ],
    },
});
