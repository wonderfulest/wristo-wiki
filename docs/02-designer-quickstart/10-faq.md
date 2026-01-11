# FAQ

> The following are example questions frequently asked by new designers. You can keep expanding this list over time.

- **Q1: I’m making a watch face for the first time. Where should I start?**  
  A: Start with a template plus a small amount of customization. First, run through the full flow of create → preview → export → publish once, then move on to more complex ideas.

- **Q2: Why does the watch face look great in the simulator but only average on the real device?**  
  A: Possible reasons include actual screen brightness and contrast, strong outdoor light, strap and skin tone combinations, resolution scaling, and more. Test on real devices in multiple scenarios and leave enough contrast and whitespace.

- **Q3: What should I do if the watch face feels laggy or drains battery quickly?**  
  A: Check for:
  - Many very large PNGs or complex translucent overlays.  
  - Too many high-frequency animations or real-time updates.  
  - Unnecessary data processing logic.  
  Try simplifying assets and logic, and prioritize the core information experience.

- **Q4: Data displayed on the device is incorrect or not updating?**  
  A:
  - Confirm that the device is actually recording the relevant data.  
  - Check if the data bindings are configured correctly.  
  - Make sure platform permissions and sync status are normal.

- **Q5: How do I report bugs or visual issues?**  
  A:
  - First collect the device model, OS version, watch face version, and screenshots or a video of the issue.  
  - Submit via the channels described in the docs (ticket system / email / community).  
  - It helps to attach exported configuration files or project info to speed up debugging.
