import * as React from "react";
import { useStyletron } from "baseui";
import { StyledInput } from "baseui/input";
import { Tag, VARIANT as TAG_VARIANT } from "baseui/tag";
const InputReplacement = React.forwardRef(
  ({ tags, removeTag, ...restProps }, ref) => {
    const [css] = useStyletron();
    return (
      <div
        className={css({
          flex: "1 1 0%",
          flexWrap: "wrap",
          display: "flex",
          alignItems: "center",
        })}
      >
        {tags.map((tag, index) => (
          <Tag
            variant={TAG_VARIANT.solid}
            onActionClick={() => removeTag(tag)}
            key={index}
          >
            {tag}
          </Tag>
        ))}
        <StyledInput ref={ref} {...restProps} />
      </div>
    );
  }
);
export default InputReplacement;
