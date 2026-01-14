import { AxiosError } from "axios";
import { Alert, Platform, ToastAndroid } from "react-native";

type DecimalObj = {s: number; e: number; d: number[]};

export function parseToDecimal(
  price: number | DecimalObj | null | undefined,
): number {
  if (!price) return 0;
  if (typeof price === 'number') return price;

  const high = price.d?.[0] ?? 0;
  const low = price.d?.[1] ?? 0;
  return (high + low / 1e7) * (price.s ?? 1);
}


export const ErrorMessage = (error: AxiosError | Error) => {
  if (error instanceof AxiosError) {
    ToastAndroid.show(error.response?.data?.message || 'Something went wrong', ToastAndroid.LONG);
  } else {
    ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
  }
}

export const SuccessMessage = (message: string) => {
  if(Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    Alert.alert('Success', message);
  }
}