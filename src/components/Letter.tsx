type Props = {
    value: string;
    visible: boolean;
}

export default function Letter({value, visible}: Props) {
  return (
    <div className={`letterContainer ${visible && 'visible'}`}>
        <span>{value}</span>
    </div>
  )
}