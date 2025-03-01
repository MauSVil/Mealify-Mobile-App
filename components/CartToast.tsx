import { Text, TouchableOpacity } from "react-native";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

interface CartToastProps {
  count: number;
  onPress: () => void;
  onClose: () => void;
}

const CartToast = ({ count, onPress, onClose }: CartToastProps) => {
  if (count === 0) return null;

  return (
    <Animated.View
      entering={SlideInDown.springify().damping(20).mass(0.5)}
      exiting={SlideOutDown.springify().damping(15).duration(600)}
      className="absolute bottom-10 z-50 left-5 right-5 bg-black p-4 rounded-2xl flex-row items-center justify-between"
    >
      <Text className="text-white text-lg">
        {" "}
        {count} producto(s) en tu carrito
      </Text>
      <TouchableOpacity
        onPress={onPress}
        className="bg-white px-4 py-2 rounded-lg"
      >
        <Text className="text-black font-bold">Ir al carrito</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CartToast;
