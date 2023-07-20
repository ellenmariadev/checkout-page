import { forwardRef } from "react";
import S from "./styles.module.scss";

export const Input = forwardRef(({ errors, ...props }, ref) => {
  let { name } = props;
  const renderErrorMessage = () => {
    return errors[name]?.message || "";
  };

  return (
    <div className={S.relative}>
      <input
        {...props}
        type={props.type}
        name={props.name}
        className={`${S.input} ${props.newclass}`}
        placeholder={props.placeholder}
        ref={ref}
        autoComplete="off"
      />
      <label className={S.label}>{props.label}</label>
      <p className="error__input">{renderErrorMessage()}</p>
    </div>
  );
});
