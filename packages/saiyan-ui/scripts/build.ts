import * as fs from "fs-extra";
import * as path from "path";
import { config } from "../vite.config";
import { build, InlineConfig, defineConfig, UserConfig } from "vite";
// import { execa } from "execa";
const buildAll = async () => {
  // const inline: InlineConfig =
  //   viteConfig;

  // 全量打包
  await build(defineConfig(config as UserConfig) as InlineConfig);
  // await build(defineConfig({}))

  // const files = ["package.json", "README.md"];
  // await Promise.all(files.map((file) => execa("cp", [file, "./dist"])));

  const srcDir = path.resolve(__dirname, "../src/");
  fs.readdirSync(srcDir)
    .filter((name) => {
      // 只要目录不要文件，且里面包含index.ts
      const componentDir = path.resolve(srcDir, name);
      const isDir = fs.lstatSync(componentDir).isDirectory();
      return isDir && fs.readdirSync(componentDir).includes("index.ts");
    })
    .forEach(async (name) => {
      console.log("name", name);

      // 文件夹遍历
      // 导出文件夹为 dist/<组件名>/ 例： dist/Button；
      // 导出模块名为： index.es.js、index.umd.js；
      // 导出模块名为： <组件名> iffe 中绑定到全局的名字。
      const outDir = path.resolve(config.build.outDir, name);
      const custom = {
        lib: {
          entry: path.resolve(srcDir, name),
          name, // 导出模块名
          fileName: `index`,
          formats: [`es`, `umd`],
        },
        outDir,
      };

      Object.assign(config.build, custom);
      await build(defineConfig(config as UserConfig) as InlineConfig);

      // 为每个子组件包定制一个自己的 package.json
      fs.outputFile(
        path.resolve(outDir, `package.json`),
        `{
          "name": "saiyan-ui/${name}",
          "main": "index.umd.js",
          "module": "index.umd.js",
        }`,
        `utf-8`
      );
    });
};

buildAll();
