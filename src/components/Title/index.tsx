import "./style.scss";

type TitleProps = {
  title: string,
  subtitle: string
}


const Title = (props: TitleProps) => {
  return (
    <div className="componentTitle">
      <div className="titles">
        <h1>{props.title}</h1>
        <span>{props.subtitle}</span>
      </div>
    </div>
  );
};

export default Title;
