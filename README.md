<p align="center">
    <img alt="logo" src="https://svg-stencils.github.io/logo-big.png">
</p>

SVG Stencils is a community driven stencil library.

SVG Stencils provides stencils for app's like Inkscape. It uses the drag
and drop ability of modern browsers. You can drag components directly to your
desktop application.

All stencils, toolkits and components in SVG Stencils are open source and free
to use commercially.

https://user-images.githubusercontent.com/658612/160613837-4df9c606-9970-4608-9b86-e0069fb5ca66.mp4

## How to use

Using SVG Stencils is easy.

1. Place your browser window next to your design app.
1. Open [svg-stencils.github.io](svg-stencils.github.io) in the browser.
1. Select a stencil with components you'd like to use.
1. Drag components from your browser directly into the canvas of your design app. The components are in SVG format, so your can change texts, element sizes etc.

## How to create a stencil library

We created an [Inkscape
Extension](https://github.com/svg-stencils/inkscape-svg_stencil_export) which
helps with the creations of new stencils.

A minimal directory structure of a stencil is:

```
./stencil-components.json
./stencil-meta.json
./component1.svg
./component2.svg
./component3.svg
```

Use [other published stencils](https://github.com/svg-stencils/svg-stencils.github.io/blob/main/data/stencils.json) as example.

## How to add my stencil to the SVG Stencils library

- Fork it ( https://github.com/svg-stencils/svg-stencils.github.io/fork )
- Create your stencil-addition branch (`git checkout -b my-new-stencil`)
- Add your the name and url of your extension to `data/stencils.json`. The files stencil-components.json and stencil-meta.json should exist.

```json
  {
        "name": "My new stencil",
        "url": "https://mipmip.pages.gitlab.gnome.org/mockup-resources/stencil-dark"
  }
```

The the above example implies the existance of these two files:

```
- https://mipmip.pages.gitlab.gnome.org/mockup-resources/stencil-dark/stencil-components.json
- https://mipmip.pages.gitlab.gnome.org/mockup-resources/stencil-dark/stencil-meta.json
```

- Commit your changes (`git commit -am 'Add new stencil'`)
- Push to the branch (`git push origin my-new-stencil`)
- Create a new Pull Request

**Note**

Only open source stencils are added. We apply a quality check. We preserve the
right to remove stencils from the library at any time. Make sure your are the
author or you are sure the components are allowed to be shared as open source
components.

## Other Contributions

1. Fork it ( https://github.com/svg-stencils/svg-stencils.github.io/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request
