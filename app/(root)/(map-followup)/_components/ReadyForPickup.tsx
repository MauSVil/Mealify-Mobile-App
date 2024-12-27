import { ActivityIndicator, Image, Text, View } from "react-native";

const ReadyForPickup = ({ data }: { data: any }) => {
  return (
    <>
      <View className="flex flex-row justify-between items-center">
        <Text className="text-2xl font-JakartaExtraBold max-w-[70%]">
          Estamos buscando un repartidor para ti...
        </Text>
        <ActivityIndicator size={40} color="#000" />
      </View>
    </>
  );
};

export default ReadyForPickup;
