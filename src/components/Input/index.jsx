import S from "./styles.module.scss";

const Input = (props) => {
  return (
    <div className={S.relative}>
      <input
        {...props}
        type={props.type}
        className={`${S.input} ${props.newclass}`}
        placeholder={props.placeholder}
      />
      <label className={S.label}>{props.label}</label>
    </div>
  );
};

export default Input;
