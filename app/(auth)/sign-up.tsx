import { Image, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Link } from "expo-router";

const SignUp = () => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
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

        <CustomButton title="Registrarse" onPress={() => {}} className="mt-6" />

        <Link
          href={"/sign-in"}
          className="text-lg text-center text-general-200 mt-10"
        >
          <Text>Ya tienes una cuenta? </Text>
          <Text className="text-primary-500">Inicia sesión</Text>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
