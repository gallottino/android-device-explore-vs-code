/*
  Structured class for describe an Android device connected to host.
*/

export interface Device {
  id: string;
  type?: string;
  usb?: string;
  product?: string;
  model?: string;
  device?: string;
  transport_id?: number;
}

export function parseDevicesOutput(strDevices: string): Device[] {
    const devices: Device[] = [];
    const toParse = strDevices.split("\n");
    // TODO: implemente parser (it is possible with adb tcp connection?)
    return devices;
}
