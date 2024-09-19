import { useState } from "react";
import { TextInput } from "react-native-paper";
import { COLORS } from "../../Utils/Colors";
interface Props extends React.ComponentProps<typeof TextInput> {}

const PasswordField = ({ ...props }: Props) => {
  const [isEye, setIsEye] = useState(false);
  return (
    <TextInput
      placeholder="Password"
      {...props}
      mode="outlined"
      secureTextEntry={!isEye}
      className="border-gray-50 "
      outlineStyle={{ borderRadius: 50 }}
      right={
        <TextInput.Icon
          color={COLORS.DeepPurple}
          icon={isEye ? "eye" : "eye-off"}
          onPress={() => setIsEye(!isEye)}
        />
      }
    />
  );
};

export default PasswordField;
