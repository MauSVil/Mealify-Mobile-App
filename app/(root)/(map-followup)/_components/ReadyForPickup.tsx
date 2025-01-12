import { ActivityIndicator, FlatList, Text, View } from "react-native";

const ReadyForPickup = ({ data }: { data: any }) => {
  return (
    <>
      <View className="flex flex-row justify-between items-center">
        <Text className="text-2xl font-JakartaExtraBold max-w-[70%]">
          Estamos buscando un repartidor para ti...
        </Text>
        <ActivityIndicator size={40} color="#000" />
      </View>
      <FlatList
        className="mt-10"
        data={[1, 2, 3]}
        renderItem={({ item }) => (
          <View className="bg-gray-200 w-[250px] max-h-52 mx-2 rounded-xl mb-4" />
        )}
        horizontal
      />
    </>
  );
};

export default ReadyForPickup;
