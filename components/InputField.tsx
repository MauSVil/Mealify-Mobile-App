import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  Keyboard,
} from "react-native";
import React, { useRef } from "react";
import { InputFieldProps } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  keyboardAvoidingViewClassName,
  iconStyle,
  className,
  ...rest
}: InputFieldProps) => {
  const inputRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={keyboardAvoidingViewClassName}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          {label && (
            <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
              {label}
            </Text>
          )}
          <View
            className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-full border border-neutral-100 focus:border-primary-500 w-full px-4`}
            onTouchStart={() => inputRef.current?.focus()}
          >
            {icon && <Ionicons name="search" size={22} color="black" />}
            <TextInput
              ref={inputRef}
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] ${inputStyle} text-left`}
              secureTextEntry={secureTextEntry}
              {...rest}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
