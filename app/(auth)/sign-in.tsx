import { Alert, Image, Text, View } from "react-native";
import React, { useCallback } from "react";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Link, router } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const SignUp = () => {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        Alert.alert("Error", "Invalid email or password. Please try again.");
      }
    } catch (err) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  }, [isLoaded, form.email, form.password]);

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
            Welcome 👋
          </Text>
        </View>
        <View className="p-5">
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
            title="Inicia Sesión"
            onPress={onSignInPress}
            className="mt-6"
          />

          <Link
            href={"/sign-up"}
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>No tienes una cuenta? </Text>
            <Text className="text-primary-500">Registrate</Text>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
