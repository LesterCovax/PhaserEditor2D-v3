namespace phasereditor2d.scene.ui.dialogs {

    export class NewUserComponentsFileDialogExtension extends files.ui.dialogs.NewFileContentExtension {

        constructor() {
            super({
                dialogName: "User Components File",
                dialogIconDescriptor: ScenePlugin.getInstance().getIconDescriptor(ICON_USER_COMPONENT),
                fileExtension: "components",
                initialFileName: "Object"
            });
        }

        getCreateFileContentFunc() {

            return (args: files.ui.dialogs.ICreateFileContentArgs) => {

                let name = args.fileName;

                const i = name.lastIndexOf(".");

                if (i > 0) {

                    name = name.substring(0, i);
                }

                const model = new editor.usercomponent.UserComponentsModel();

                const sceneSettings = ScenePlugin.getInstance().getDefaultSceneSettings();

                model.setInsetSpaces(sceneSettings.compilerInsertSpaces);
                model.setTabSize(sceneSettings.compilerTabSize);
                model.setOutputLang(sceneSettings.compilerOutputLanguage);

                const finder = ScenePlugin.getInstance().getSceneFinder();

                const models = [...finder.getUserComponentsModels()];

                if (models.length > 0) {

                    models.sort((a, b) => a.file.getModTime() - b.file.getModTime());

                    const lastModel = models[models.length - 1];

                    model.setOutputLang(lastModel.model.getOutputLang());
                    model.setTabSize(lastModel.model.getTabSize());
                    model.setInsetSpaces(lastModel.model.isInsertSpaces());
                }

                const data = model.toJSON();

                return JSON.stringify(data, null, 2);
            };
        }

        getInitialFileLocation() {

            return super.findInitialFileLocationBasedOnContentType(scene.core.CONTENT_TYPE_USER_COMPONENTS);
        }
    }
}