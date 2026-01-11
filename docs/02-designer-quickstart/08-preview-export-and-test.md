# Preview, Export & Testing

- **Online preview**  
  - Use the preview feature in the editor to check overall layout, colors, and data placement.  
  - Preview at different scales to simulate real viewing distance when worn.

- **Multi-device adaptation checks**  
  - If a watch face supports multiple device resolutions:
    - Check each resolution to ensure no elements are cropped or covered.  
    - Verify safe areas and edge margins.  
  - Create fine-tuned variants for different resolutions if necessary.

- **Export configurations (such as `conf.json`)**  
  - After finishing your design, export the configuration and asset bundle according to platform requirements.  
  - Files like `conf.json` typically include information such as resolution, data bindings, and asset paths.  
  - Before exporting, make sure project naming is consistent, version numbers are updated, and all required platform fields are filled in.

- **Common testing issues**  
  - Looks fine in the simulator but not on the real device: check device model, OS version, and permissions.  
  - Animations or dynamic effects feel laggy: reduce the number of layers, compress images, and simplify logic.  
  - Color discrepancies: observe in real outdoor environments and adjust contrast and brightness accordingly.
