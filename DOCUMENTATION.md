<p align="center">
  <img alt="logo" src="https://svg-stencils.github.io/images/logo-big.png">
</p>

SVG Stencils is a community driven stencil library.

## How to use

Using SVG Stencils is easy.

1. Place your browser window next to your design app.
1. Open [svg-stencils.github.io](svg-stencils.github.io) in the browser.
1. Select a stencil with components you'd like to use.
1. Drag components from your browser directly into the canvas of your design app. The components are in SVG format, so your can change texts, element sizes etc.

## How to create a stencil library manually

A minimal directory structure of a stencil is:

```
./stencil-components.json
./stencil-meta.json
./component1.svg
./component2.svg
./component3.svg
```

Use [other published stencils](https://github.com/svg-stencils/svg-stencils.github.io/blob/main/public/stencils.json) as example.

## How to create a stencil library with the SVG Stencil Inkscape Extension

We created an [Inkscape
Extension](https://github.com/svg-stencils/inkscape-svg_stencil_export) which
helps with the creations of new stencils.

1. Install the extension
2. Open your svg file with reusable components
3. Move all single components to a separate layer
4. Move all stuff you don not want to share to a hidden layer
5. Open de extension from the extension menu
6. Choose an newly created output directory as export path
6. Fill in all fields on the first 3 tabs.
7. You can use this extension multiple times, but the first time, make sure to check `write stencil-components.json` and `write -stencil-meta.json`

## Test your stencil

If you can run a (local) webserver you can test your stencil in the SVG
Stencils Web App. Your stencil URL is the url pointing to the parent directory
of stencil-meta.json and stencil-components.json. Add this URL as query
parameter to the svg-stencils-url.

```
# Mac
open https://svg-stencils.github.io/?stencil=http://localhost:8080

# Linux
xdg-open https://svg-stencils.github.io?stencil=http://localhost:8080
```

Not all local webservers work. `http.server` with cors enabled has been proven to work from a
local address.

```

cd my-stencil-directory
npm exec http-server -- --cors
```



## How to publish a stencil on Github Pages

**Use the [Inkscape
Extension](https://github.com/svg-stencils/inkscape-svg_stencil_export) to create your stencil-directory**. Make sure to check `Create GitHub Pages Workflow` and also create `index.html` and `readme.md`.

![githubpages](https://user-images.githubusercontent.com/658612/162697448-e1fd793b-90c7-40ca-93ba-1e0cd6ca06cb.png)

On Github [create a new repository](https://github.com/new) and follow instructions to add the contents of your stencil directory to the new repository.

**Make sure to add .github**

```
cd my-repo
git add .github
git commit -m "add github workflow"
git push
```

When the repo is pushed **setup github pages**.

![githubpages2](https://user-images.githubusercontent.com/658612/162701768-b940ef31-0f0f-48cf-a1b4-901284a9b2e7.png)

1. Go to the repo settings
2. Go to the pages section
3. Choose the root of the main branch as pages source
4. Thats it, after a few minutes you can click the link and a preview of your stencil should be visible.

## How to add a stencil to the SVG-Stencils library

- Fork the the svg-stencil project ( https://github.com/svg-stencils/svg-stencils.github.io/fork )
- Create your stencil-addition branch (`git checkout -b my-new-stencil`)
- Add your the name and url of your extension to `public/stencils.json`. The files stencil-components.json and stencil-meta.json should exist.

```json
  {
        "name": "My new stencil",
        "url": "https://mipmip.pages.gitlab.gnome.org/my-new-stencil"
  }
```

The the above example implies the existance of these two files:

```
- https://mipmip.pages.gitlab.gnome.org/my-new-stencil/stencil-components.json
- https://mipmip.pages.gitlab.gnome.org/my-new-stencil/stencil-meta.json
```

- Make sure the json is correct, you can test the syntax of the json here: https://jsonlint.com/
- Commit your changes (`git commit -am 'Add new stencil'`)
- Push to the branch (`git push origin my-new-stencil`)
- Create a new Pull Request

**Note**

Only open source stencils are added. We apply a quality check. We preserve the
right to remove stencils from the library at any time. Make sure your are the
author or you are sure the components are allowed to be shared as open source
components.
