
namespace phasereditor2d.scene.ui {

    export class GameScene extends Phaser.Scene {

        private _sceneType: json.SceneType;
        private _inEditor: boolean;
        private _initialState: any;

        constructor(inEditor = true) {
            super("ObjectScene");

            this._inEditor = inEditor;

            this._sceneType = "Scene";
        }

        getDisplayListChildren(): sceneobjects.SceneObject[] {
            return this.sys.displayList.getChildren() as any;
        }

        visit(visitor: (obj: sceneobjects.SceneObject) => void) {

            for (const obj of this.getDisplayListChildren()) {

                visitor(obj);

                if (obj instanceof sceneobjects.Container) {

                    for (const child of obj.list) {
                        visitor(child);
                    }
                }
            }
        }

        makeNewName(baseName: string) {

            const nameMaker = new colibri.ui.ide.utils.NameMaker((obj: sceneobjects.SceneObject) => {
                return obj.getEditorSupport().getLabel();
            });

            this.visit(obj => nameMaker.update([obj]));

            return nameMaker.makeName(baseName);
        }

        getByEditorId(id: string) {

            const obj = GameScene.findByEditorId(this.getDisplayListChildren(), id);

            if (!obj) {
                console.error(`Object with id=${id} not found.`);
            }

            return obj;
        }

        static findByEditorId(list: sceneobjects.SceneObject[], id: string) {

            for (const obj of list) {

                if (obj.getEditorSupport().getId() === id) {
                    return obj;
                }

                if (obj instanceof sceneobjects.Container) {

                    const result = this.findByEditorId(obj.list, id);

                    if (result) {
                        return result;
                    }
                }
            }

            return null;
        }

        getSceneType() {
            return this._sceneType;
        }

        setSceneType(sceneType: json.SceneType): void {
            this._sceneType = sceneType;
        }

        getCamera() {
            return this.cameras.main;
        }

        setInitialState(state: any) {
            this._initialState = state;
        }

        create() {

            if (this._inEditor) {

                const camera = this.getCamera();
                camera.setOrigin(0, 0);
                // camera.backgroundColor = Phaser.Display.Color.ValueToColor("#6e6e6e");
                camera.backgroundColor = Phaser.Display.Color.ValueToColor("#8e8e8e");

                if (this._initialState) {

                    camera.zoom = this._initialState.cameraZoom ?? camera.zoom;
                    camera.scrollX = this._initialState.cameraScrollX ?? camera.scrollX;
                    camera.scrollY = this._initialState.cameraScrollY ?? camera.scrollY;

                    this._initialState = null;
                }
            }

        }
    }

}