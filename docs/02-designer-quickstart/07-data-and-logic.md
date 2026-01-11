# Data & Logic

- **Data fields (examples)**  
  - Steps, heart rate, calories, floors, distance, battery level, weather, etc.  
  - Supported data fields may vary by platform; always refer to the platform’s own documentation.

- **Data binding (concept)**  
  - In the editor, select a component (such as a text element) and bind it to a corresponding data field.  
  - You can configure display formats (for example, 24/12-hour time, units, prefixes/suffixes).

- **Conditional display and state switching (if supported by the platform)**  
  - Switch styles based on device state, such as active/resting, day/night, or high/low battery.  
  - This is useful for implementing low-power simplified modes, night modes, etc.  
  - For detailed configuration, refer to advanced tutorials or platform documentation.

- **Common data issues**  
  - Data is empty or zero: the device may not have recorded data for the day, permissions may not be granted, or there may be limitations in the simulator.  
  - Data differs from the real device: be aware of differences between simulator, historical data, and real-time data.  
  - Test on real devices in multiple scenarios (active/resting, day/night, etc.).
