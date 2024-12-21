import { Alert, Image, Text, View } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { api } from "@/lib/api";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        await api.post("/auth/register", {
          name: form.name,
          email: form.email,
          clerk_user_id: signUpAttempt.createdUserId,
          phone: "5535209307",
          role: "user",
        });

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.signUpCar}
            className="z-0 w-full h-[250px] rounded-b-3xl"
            resizeMode="cover"
          />
          <Text className="text-2xl absolute bottom-5 left-5 text-black font-JakartaSemiBold">
            Crea una cuenta
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Nombre"
            placeholder="Ingrese su nombre..."
            icon={icons.person}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
          <InputField
            autoCapitalize="none"
            label="Email"
            placeholder="Ingrese su email..."
            icon={icons.email}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <InputField
            label="Contraseña"
            placeholder="Ingrese su contraseña..."
            icon={icons.lock}
            secureTextEntry
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />

          <CustomButton
            title="Registrarse"
            onPress={onSignUpPress}
            className="mt-6"
          />

          <Link
            href={"/sign-in"}
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Ya tienes una cuenta? </Text>
            <Text className="text-primary-500">Inicia sesión</Text>
          </Link>
        </View>
      </View>
      <ReactNativeModal
        isVisible={verification.state === "pending"}
        onModalHide={() => {
          if (verification.state === "success") setShowSuccessModal(true);
        }}
      >
        <View className="bg-white px-8 py-9 rounded-2xl min-h-[300px]">
          <Text className="text-2xl font-JakartaExtraBold mb-2">
            Verificar Email
          </Text>
          <Text className="font-Jakarta mb-5">
            Hemos enviado un código de verificación a tu correo electrónico{" "}
            {form.email}
          </Text>
          <InputField
            label="Codigo"
            icon={icons.lock}
            placeholder="12345"
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(text) =>
              setVerification({ ...verification, code: text })
            }
          />

          {verification.error && (
            <Text className="text-red-500 text-sm my-1">
              {verification.error}
            </Text>
          )}

          <CustomButton
            title="Verificar Correo"
            onPress={onVerifyPress}
            className="mt-5 bg-success-500"
          />
        </View>
      </ReactNativeModal>

      <ReactNativeModal isVisible={showSuccessModal}>
        <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={images.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-JakartaBold text-center">
            Verificado
          </Text>
          <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
            Tu correo electrónico ha sido verificado exitosamente
          </Text>
          <CustomButton
            title="Ir a Inicio"
            onPress={() => {
              setShowSuccessModal(false);
              router.push("/(root)/(tabs)/home");
            }}
            className="mt-5"
          />
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default SignUp;
