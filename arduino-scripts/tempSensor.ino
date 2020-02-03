const int tempPin = 0;
void setup()
{
 Serial.begin(9600);
}
void loop()
{
 float voltage;
 voltage = getVoltage(tempPin);
 Serial.println(voltage);
 delay(500);
}
float getVoltage(int pin)
{
  return (analogRead(pin) * 0.004882814);
}
