import {
    useMemo
} from "react";

function renderInkCharacters(
    text,
    keyPrefix
) {

    return Array.from(
        text
    ).map(
        (
            char,
            index
        ) => {

            const key =
                `${keyPrefix}-${index}`;

            const style = {
                "--char-i": index
            };

            if (
                char ===
                "\n"
            ) {
                return (
                    <br
                        key={
                            key
                        }
                    />
                );
            }

            if (
                char ===
                " "
            ) {
                return (
                    <span
                        key={
                            key
                        }
                        className="gd-ink-char gd-ink-space"
                        style={
                            style
                        }
                    >
                        {"\u00A0"}
                    </span>
                );
            }

            return (
                <span
                    key={
                        key
                    }
                    className="gd-ink-char"
                    style={
                        style
                    }
                >
                    {char}
                </span>
            );
        }
    );
}

export default function AnimatedInkText({
    as: Tag = "span",
    style,
    className = "",
    id,
    text = "",
    lines = null
}) {

    const segments =
        useMemo(
            () => {

                if (
                    Array.isArray(
                        lines
                    ) &&
                    lines.length
                ) {
                    return lines.filter(
                        (
                            line
                        ) =>
                            typeof line ===
                            "string"
                    );
                }

                if (
                    typeof text ===
                    "string"
                ) {
                    return [
                        text
                    ];
                }

                return [];
            },
            [
                text,
                lines
            ]
        );

    return (
        <Tag
            id={id}
            style={style}
            className={
                `gd-ink-text-line ${className}`.trim()
            }
        >
            {segments.map(
                (
                    line,
                    lineIndex
                ) => (

                    <span
                        key={
                            `line-${lineIndex}`
                        }
                        className="gd-ink-line"
                    >
                        {renderInkCharacters(
                            line,
                            `line-${lineIndex}`
                        )}
                        {lineIndex <
                        segments.length -
                            1 ? (
                            <br />
                        ) : null}
                    </span>

                )
            )}
        </Tag>
    );
}
