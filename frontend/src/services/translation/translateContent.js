import {
    Children,
    isValidElement
} from "react";

export function childrenToTranslatable(
    children,
    valuesProp
) {

    if (
        children ===
            null ||
        children ===
            undefined
    ) {
        return {
            template: "",
            values:
                valuesProp ||
                null
        };
    }

    if (
        typeof children ===
            "string" ||
        typeof children ===
            "number"
    ) {
        return {
            template:
                String(
                    children
                ),
            values:
                valuesProp ||
                null
        };
    }

    const parts =
        Children.toArray(
            children
        );

    if (
        parts.length ===
            1 &&
        (
            typeof parts[0] ===
                "string" ||
            typeof parts[0] ===
                "number"
        )
    ) {
        return {
            template:
                String(
                    parts[0]
                ),
            values:
                valuesProp ||
                null
        };
    }

    let template = "";

    const values = {
        ...(valuesProp ||
            {})
    };

    let index = 0;

    for (
        const part of
        parts
    ) {

        if (
            typeof part ===
                "string" ||
            typeof part ===
                "number"
        ) {
            template +=
                String(
                    part
                );

            continue;
        }

        if (
            isValidElement(
                part
            )
        ) {
            return {
                raw: children
            };
        }

        const key =
            `v${index}`;

        index += 1;

        values[key] =
            part;

        template +=
            `{{${key}}}`;
    }

    return {
        template,
        values:
            Object.keys(
                values
            ).length
                ? values
                : null
    };
}
