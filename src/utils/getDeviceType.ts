export const DeviceType = {
  iOS: 'iOS',
  iOSMobile: 'iOSMobile',
  iOSTablet: 'iOSTablet',
  Android: 'Android',
  Windows: 'Windows',
  Mac: 'Mac',
  Unknown: 'Unknown',
} as const;

export type DeviceType = (typeof DeviceType)[keyof typeof DeviceType];

export function getDeviceType() {
  const userAgent = navigator.userAgent;

  if (/iPad|iPhone|iPod/.test(userAgent)) return DeviceType.iOS;
  if (/iPhone|iPod/.test(userAgent)) return DeviceType.iOSMobile;
  if (/iPad/.test(userAgent)) return DeviceType.iOSTablet;
  if (/Android/.test(userAgent)) return DeviceType.Android;
  if (/Windows/.test(userAgent)) return DeviceType.Windows;
  if (/Macintosh/.test(userAgent)) return DeviceType.Mac;
  return DeviceType.Unknown;
}

export function matchesDeviceType(deviceTypes: DeviceType[]) {
  const device = getDeviceType();

  return deviceTypes.some((type) => type === device);
}
