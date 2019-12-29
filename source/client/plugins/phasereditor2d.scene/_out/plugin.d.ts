declare namespace phasereditor2d.scene {
    const ICON_GROUP = "group";
    const ICON_TRANSLATE = "translate";
    const ICON_ANGLE = "angle";
    const ICON_SCALE = "scale";
    const ICON_ORIGIN = "origin";
    class ScenePlugin extends colibri.Plugin {
        private static _instance;
        static getInstance(): ScenePlugin;
        private constructor();
        registerExtensions(reg: colibri.ExtensionRegistry): void;
        getObjectExtensions(): ui.sceneobjects.SceneObjectExtension[];
        getObjectExtensionByObjectType(type: string): ui.sceneobjects.SceneObjectExtension;
    }
}
declare namespace phasereditor2d.scene.core {
    import core = colibri.core;
    const CONTENT_TYPE_SCENE = "phasereditor2d.core.scene.SceneContentType";
    class SceneContentTypeResolver extends core.ContentTypeResolver {
        constructor();
        computeContentType(file: core.io.FilePath): Promise<string>;
    }
}
declare namespace Phaser.Cameras.Scene2D {
    interface Camera {
        getScreenPoint(worldX: number, worldY: number): Phaser.Math.Vector2;
    }
}
declare namespace phasereditor2d.scene.ui {
}
declare namespace phasereditor2d.scene.ui {
    class GameScene extends Phaser.Scene {
        private _sceneType;
        private _inEditor;
        private _initialState;
        constructor(inEditor?: boolean);
        getDisplayListChildren(): sceneobjects.SceneObject[];
        visit(visitor: (obj: sceneobjects.SceneObject) => void): void;
        makeNewName(baseName: string): string;
        getByEditorId(id: string): any;
        static findByEditorId(list: sceneobjects.SceneObject[], id: string): any;
        getSceneType(): json.SceneType;
        setSceneType(sceneType: json.SceneType): void;
        getCamera(): Phaser.Cameras.Scene2D.Camera;
        setInitialState(state: any): void;
        create(): void;
    }
}
declare namespace phasereditor2d.scene.ui {
    class SceneMaker {
        private _scene;
        constructor(scene: GameScene);
        createObject(objData: any): sceneobjects.SceneObject;
        createContainerWithObjects(objectList: sceneobjects.SceneObject[]): sceneobjects.Container;
        createWithDropEvent_async(e: DragEvent, dropDataArray: any[]): Promise<sceneobjects.SceneObject[]>;
    }
}
declare namespace phasereditor2d.scene.ui {
    import controls = colibri.ui.controls;
    import core = colibri.core;
    class SceneThumbnail implements controls.IImage {
        private _file;
        private _image;
        private _promise;
        constructor(file: core.io.FilePath);
        paint(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, center: boolean): void;
        paintFrame(context: CanvasRenderingContext2D, srcX: number, srcY: number, srcW: number, srcH: number, dstX: number, dstY: number, dstW: number, dstH: number): void;
        getWidth(): number;
        getHeight(): number;
        preloadSize(): Promise<controls.PreloadResult>;
        preload(): Promise<controls.PreloadResult>;
        private createImageElement;
    }
}
declare namespace phasereditor2d.scene.ui {
    import controls = colibri.ui.controls;
    import core = colibri.core;
    class SceneThumbnailCache extends core.io.FileContentCache<controls.IImage> {
        static _instance: SceneThumbnailCache;
        static getInstance(): SceneThumbnailCache;
        private constructor();
    }
}
declare namespace phasereditor2d.scene.ui.blocks {
    class SceneEditorBlocksCellRendererProvider extends pack.ui.viewers.AssetPackCellRendererProvider {
        constructor();
        getCellRenderer(element: any): colibri.ui.controls.viewers.ICellRenderer;
    }
}
declare namespace phasereditor2d.scene.ui.blocks {
    class SceneEditorBlocksContentProvider extends pack.ui.viewers.AssetPackContentProvider {
        private _getPacks;
        constructor(getPacks: () => pack.core.AssetPack[]);
        getPackItems(): pack.core.AssetPackItem[];
        getRoots(input: any): any[];
        getSceneFiles(): colibri.core.io.FilePath[];
        getChildren(parent: any): any[];
    }
}
declare namespace phasereditor2d.scene.ui.blocks {
    class SceneEditorBlocksLabelProvider extends pack.ui.viewers.AssetPackLabelProvider {
        getLabel(obj: any): string;
    }
}
declare namespace phasereditor2d.scene.ui.blocks {
    import controls = colibri.ui.controls;
    class SceneEditorBlocksPropertyProvider extends pack.ui.properties.AssetPackPreviewPropertyProvider {
        addSections(page: controls.properties.PropertyPage, sections: controls.properties.PropertySection<any>[]): void;
    }
}
declare namespace phasereditor2d.scene.ui.blocks {
    import controls = colibri.ui.controls;
    import ide = colibri.ui.ide;
    class SceneEditorBlocksProvider extends ide.EditorViewerProvider {
        private _editor;
        private _packs;
        constructor(editor: editor.SceneEditor);
        preload(): Promise<void>;
        prepareViewerState(state: controls.viewers.ViewerState): void;
        private getFreshItems;
        private getFreshItem;
        getContentProvider(): controls.viewers.ITreeContentProvider;
        getLabelProvider(): controls.viewers.ILabelProvider;
        getCellRendererProvider(): controls.viewers.ICellRendererProvider;
        getTreeViewerRenderer(viewer: controls.viewers.TreeViewer): SceneEditorBlocksTreeRendererProvider;
        getUndoManager(): editor.SceneEditor;
        getPropertySectionProvider(): controls.properties.PropertySectionProvider;
        getInput(): this;
    }
}
declare namespace phasereditor2d.scene.ui.blocks {
    import controls = colibri.ui.controls;
    const PREFAB_SECTION = "Prefab";
    class SceneEditorBlocksTreeRendererProvider extends pack.ui.viewers.AssetPackTreeViewerRenderer {
        constructor(viewer: controls.viewers.TreeViewer);
    }
}
declare namespace phasereditor2d.scene.ui.dialogs {
    class NewSceneFileDialogExtension extends files.ui.dialogs.NewFileContentExtension {
        constructor();
        getInitialFileLocation(): colibri.core.io.FilePath;
    }
}
declare namespace phasereditor2d.scene.ui.editor {
    class ActionManager {
        private _editor;
        constructor(editor: SceneEditor);
        deleteObjects(): void;
        joinObjectsInContainer(): void;
    }
}
declare namespace phasereditor2d.scene.ui.editor {
    class CameraManager {
        private _editor;
        private _dragStartPoint;
        private _dragStartCameraScroll;
        constructor(editor: SceneEditor);
        private getCamera;
        private onMouseDown;
        private onMouseMove;
        private onMouseUp;
        private onWheel;
    }
}
declare namespace phasereditor2d.scene.ui.editor {
    class DropManager {
        private _editor;
        constructor(editor: SceneEditor);
        onDragDrop_async(e: DragEvent): Promise<void>;
        private onDragOver;
        private acceptsDropData;
        private acceptsDropDataArray;
    }
}
declare namespace phasereditor2d.scene.ui.editor {
    class OverlayLayer {
        private _editor;
        private _canvas;
        private _ctx;
        constructor(editor: SceneEditor);
        getCanvas(): HTMLCanvasElement;
        private resetContext;
        resizeTo(): void;
        render(): void;
        private renderSelection;
        private renderGrid;
    }
}
declare namespace phasereditor2d.scene.ui.editor {
    import controls = colibri.ui.controls;
    import io = colibri.core.io;
    class SceneEditor extends colibri.ui.ide.FileEditor {
        private _blocksProvider;
        private _outlineProvider;
        private _propertyProvider;
        private _game;
        private _overlayLayer;
        private _gameCanvas;
        private _gameScene;
        private _sceneMaker;
        private _dropManager;
        private _cameraManager;
        private _selectionManager;
        private _actionManager;
        private _gameBooted;
        private _sceneRead;
        static getFactory(): colibri.ui.ide.EditorFactory;
        constructor();
        doSave(): Promise<void>;
        saveState(state: any): void;
        restoreState(state: any): void;
        protected onEditorInputContentChanged(): void;
        setInput(file: io.FilePath): void;
        protected createPart(): void;
        private updateTitleIcon;
        getIcon(): controls.IImage;
        createEditorToolbar(parent: HTMLElement): controls.ToolbarManager;
        private readScene;
        getSelectedGameObjects(): sceneobjects.SceneObject[];
        getActionManager(): ActionManager;
        getSelectionManager(): SelectionManager;
        getOverlayLayer(): OverlayLayer;
        getGameCanvas(): HTMLCanvasElement;
        getGameScene(): GameScene;
        getGame(): Phaser.Game;
        getSceneMaker(): SceneMaker;
        layout(): void;
        getPropertyProvider(): properties.SceneEditorSectionProvider;
        onPartActivated(): Promise<void>;
        getEditorViewerProvider(key: string): blocks.SceneEditorBlocksProvider | outline.SceneEditorOutlineProvider;
        getOutlineProvider(): outline.SceneEditorOutlineProvider;
        refreshOutline(): void;
        private onGameBoot;
        repaint(): void;
    }
}
declare namespace phasereditor2d.scene.ui.editor {
    class SelectionManager {
        private _editor;
        constructor(editor: SceneEditor);
        clearSelection(): void;
        refreshSelection(): void;
        selectAll(): void;
        private updateOutlineSelection;
        private onMouseClick;
        hitTestOfActivePointer(): Phaser.GameObjects.GameObject[];
    }
}
declare namespace phasereditor2d.scene.ui.editor.commands {
    class SceneEditorCommands {
        static registerCommands(manager: colibri.ui.ide.commands.CommandManager): void;
    }
}
declare namespace phasereditor2d.scene.ui.editor.outline {
    import controls = colibri.ui.controls;
    class GameObjectCellRenderer implements controls.viewers.ICellRenderer {
        renderCell(args: controls.viewers.RenderCellArgs): void;
        cellHeight(args: colibri.ui.controls.viewers.RenderCellArgs): number;
        preload(args: controls.viewers.PreloadCellArgs): Promise<colibri.ui.controls.PreloadResult>;
    }
}
declare namespace phasereditor2d.scene.ui.editor.outline {
    import controls = colibri.ui.controls;
    class SceneEditorOutlineContentProvider implements controls.viewers.ITreeContentProvider {
        getRoots(input: any): any[];
        getChildren(parent: any): any[];
    }
}
declare namespace phasereditor2d.scene.ui.editor.outline {
    import controls = colibri.ui.controls;
    class SceneEditorOutlineLabelProvider implements controls.viewers.ILabelProvider {
        getLabel(obj: any): string;
    }
}
declare namespace phasereditor2d.scene.ui.editor.outline {
    import controls = colibri.ui.controls;
    import ide = colibri.ui.ide;
    class SceneEditorOutlineProvider extends ide.EditorViewerProvider {
        private _editor;
        constructor(editor: SceneEditor);
        getUndoManager(): ide.undo.UndoManager;
        getContentProvider(): controls.viewers.ITreeContentProvider;
        getLabelProvider(): controls.viewers.ILabelProvider;
        getCellRendererProvider(): controls.viewers.ICellRendererProvider;
        getTreeViewerRenderer(viewer: controls.viewers.TreeViewer): controls.viewers.TreeViewerRenderer;
        getPropertySectionProvider(): controls.properties.PropertySectionProvider;
        getInput(): SceneEditor;
        preload(): Promise<void>;
        onViewerSelectionChanged(selection: any[]): void;
    }
}
declare namespace phasereditor2d.scene.ui.editor.outline {
    import controls = colibri.ui.controls;
    class SceneEditorOutlineRendererProvider implements controls.viewers.ICellRendererProvider {
        private _editor;
        private _assetRendererProvider;
        constructor(editor: SceneEditor);
        getCellRenderer(element: any): controls.viewers.ICellRenderer;
        preload(args: controls.viewers.PreloadCellArgs): Promise<controls.PreloadResult>;
    }
}
declare namespace phasereditor2d.scene.ui.editor.properties {
    abstract class SceneSection<T> extends colibri.ui.controls.properties.PropertySection<T> {
    }
}
declare namespace phasereditor2d.scene.ui.editor.properties {
    import controls = colibri.ui.controls;
    class OriginSection extends SceneSection<sceneobjects.Image> {
        constructor(page: controls.properties.PropertyPage);
        protected createForm(parent: HTMLDivElement): void;
        canEdit(obj: any, n: number): boolean;
        canEditNumber(n: number): boolean;
    }
}
declare namespace phasereditor2d.scene.ui.editor.properties {
    import controls = colibri.ui.controls;
    class SceneEditorSectionProvider extends controls.properties.PropertySectionProvider {
        addSections(page: controls.properties.PropertyPage, sections: controls.properties.PropertySection<any>[]): void;
    }
}
declare namespace phasereditor2d.scene.ui.editor.properties {
    import controls = colibri.ui.controls;
    class TextureSection extends SceneSection<sceneobjects.Image> {
        constructor(page: controls.properties.PropertyPage);
        protected createForm(parent: HTMLDivElement): void;
        canEdit(obj: any): boolean;
        canEditNumber(n: number): boolean;
    }
}
declare namespace phasereditor2d.scene.ui.editor.properties {
    class TransformSection extends SceneSection<sceneobjects.Image> {
        constructor(page: colibri.ui.controls.properties.PropertyPage);
        protected createForm(parent: HTMLDivElement): void;
        canEdit(obj: any, n: number): boolean;
        canEditNumber(n: number): boolean;
    }
}
declare namespace phasereditor2d.scene.ui.editor.properties {
    import controls = colibri.ui.controls;
    class VariableSection extends SceneSection<sceneobjects.SceneObject> {
        constructor(page: controls.properties.PropertyPage);
        protected createForm(parent: HTMLDivElement): void;
        canEdit(obj: any, n: number): boolean;
        canEditNumber(n: number): boolean;
    }
}
declare namespace phasereditor2d.scene.ui.editor.undo {
    import ide = colibri.ui.ide;
    abstract class SceneEditorOperation extends ide.undo.Operation {
        protected _editor: SceneEditor;
        constructor(editor: SceneEditor);
    }
}
declare namespace phasereditor2d.scene.ui.editor.undo {
    class AddObjectsOperation extends SceneEditorOperation {
        private _dataList;
        constructor(editor: SceneEditor, objects: sceneobjects.SceneObject[]);
        undo(): void;
        redo(): void;
        private updateEditor;
    }
}
declare namespace phasereditor2d.scene.ui.editor.undo {
    class JoinObjectsInContainerOperation extends SceneEditorOperation {
        private _containerId;
        private _objectsIdList;
        constructor(editor: SceneEditor, container: sceneobjects.Container);
        undo(): void;
        redo(): void;
        private updateEditor;
    }
}
declare namespace phasereditor2d.scene.ui.editor.undo {
    class RemoveObjectsOperation extends AddObjectsOperation {
        constructor(editor: SceneEditor, objects: sceneobjects.SceneObject[]);
        undo(): void;
        redo(): void;
    }
}
declare namespace phasereditor2d.scene.ui.json {
    class ObjectComponent {
        static write(sprite: sceneobjects.SceneObject, data: any): void;
        static read(sprite: sceneobjects.SceneObject, data: any): void;
    }
}
declare namespace phasereditor2d.scene.ui.json {
    interface ReadWriteJSON {
        writeJSON(data: any): void;
        readJSON(data: any): void;
    }
}
declare namespace phasereditor2d.scene.ui.json {
    type SceneType = "Scene" | "Prefab";
    type SceneData = {
        sceneType: SceneType;
        displayList: any[];
        meta: {
            app: string;
            url: string;
            contentType: string;
        };
    };
}
declare namespace phasereditor2d.scene.ui.json {
    class SceneParser {
        private _scene;
        constructor(scene: GameScene);
        static isValidSceneDataFormat(data: SceneData): boolean;
        createScene(data: SceneData): void;
        createSceneCache_async(data: SceneData): Promise<void>;
        private updateSceneCacheWithObjectData_async;
        addToCache_async(data: pack.core.AssetPackItem | pack.core.AssetPackImageFrame): Promise<void>;
        createObject(data: any): sceneobjects.SceneObject;
        static initSprite(sprite: Phaser.GameObjects.GameObject): void;
        static setNewId(sprite: sceneobjects.SceneObject): void;
    }
}
declare namespace phasereditor2d.scene.ui.json {
    class SceneWriter {
        private _scene;
        constructor(scene: GameScene);
        toJSON(): SceneData;
        toString(): string;
    }
}
declare namespace phasereditor2d.scene.ui.json {
    class TextureComponent {
        static textureKey: string;
        static frameKey: string;
        static write(sprite: sceneobjects.Image, data: any): void;
        static read(sprite: sceneobjects.Image, data: any): void;
    }
}
declare namespace phasereditor2d.scene.ui.json {
    type TransformLike = sceneobjects.Image | sceneobjects.Container;
    class TransformComponent {
        static write(sprite: TransformLike, data: any): void;
        static read(sprite: TransformLike, data: any): void;
    }
}
declare namespace phasereditor2d.scene.ui.json {
    class VariableComponent {
        static write(sprite: sceneobjects.SceneObject, data: any): void;
        static read(sprite: sceneobjects.SceneObject, data: any): void;
    }
}
declare namespace phasereditor2d.scene.ui.sceneobjects {
    class Container extends Phaser.GameObjects.Container implements SceneObject {
        private _editorSupport;
        constructor(scene: GameScene, x: number, y: number, children: SceneObject[]);
        getEditorSupport(): EditorSupport;
        static add(scene: GameScene, x: number, y: number, list: SceneObject[]): Container;
        get list(): SceneObject[];
        set list(list: SceneObject[]);
        writeJSON(data: any): void;
        readJSON(data: any): void;
        getScreenBounds(camera: Phaser.Cameras.Scene2D.Camera): Phaser.Math.Vector2[];
    }
}
declare namespace phasereditor2d.scene.ui.sceneobjects {
    interface CreateWithAssetArgs {
        x: number;
        y: number;
        nameMaker: colibri.ui.ide.utils.NameMaker;
        scene: GameScene;
        asset: any;
    }
    interface CreateWithDataArgs {
        scene: GameScene;
        data: any;
    }
    abstract class SceneObjectExtension extends colibri.Extension {
        static POINT_ID: string;
        private _typeName;
        private _phaserTypeName;
        constructor(config: {
            typeName: string;
            phaserTypeName: string;
        });
        getTypeName(): string;
        getPhaserTypeName(): string;
        /**
         * Check if an object dropped into the scene can be used to create the scene object of this extension.
         *
         * @param data Data dropped from outside the scene editor. For example, items from the Blocks view.
         */
        abstract acceptsDropData(data: any): boolean;
        /**
         * Create the scene object of this extension with the data involved in a drop action.
         * The data was tested before with the `acceptsDropData()` method.
         *
         * @param args The data involved in a drop action.
         */
        abstract createSceneObjectWithAsset(args: CreateWithAssetArgs): sceneobjects.SceneObject;
        /**
         * Create the scene object of this extension with the data involved in a deserialization.
         *
         * @param args The data involved in the creation of the object.
         */
        abstract createSceneObjectWithData(args: CreateWithDataArgs): sceneobjects.SceneObject;
    }
}
declare namespace phasereditor2d.scene.ui.sceneobjects {
    class ContainerExtension extends SceneObjectExtension {
        constructor();
        createSceneObjectWithData(args: CreateWithDataArgs): sceneobjects.SceneObject;
        private createContainerObject;
        acceptsDropData(data: any): boolean;
        createSceneObjectWithAsset(args: CreateWithAssetArgs): sceneobjects.SceneObject;
    }
}
declare namespace phasereditor2d.scene.ui.sceneobjects {
    class EditorSupport {
        private _object;
        private _label;
        private _scene;
        constructor(obj: SceneObject);
        getObject(): SceneObject;
        getId(): string;
        setId(id: string): void;
        getLabel(): string;
        setLabel(label: string): void;
        getScene(): GameScene;
        setScene(scene: GameScene): void;
    }
}
declare namespace phasereditor2d.scene.ui.sceneobjects {
    function getContainerScreenBounds(container: Container, camera: Phaser.Cameras.Scene2D.Camera): Phaser.Math.Vector2[];
}
declare namespace phasereditor2d.scene.ui.sceneobjects {
    function getScreenBounds(sprite: Image, camera: Phaser.Cameras.Scene2D.Camera): Phaser.Math.Vector2[];
}
declare namespace phasereditor2d.scene.ui.sceneobjects {
    class Image extends Phaser.GameObjects.Image implements SceneObject {
        private _editorSupport;
        constructor(scene: GameScene, x: number, y: number, texture: string, frame?: string | number);
        getEditorSupport(): ImageEditorSupport;
        writeJSON(data: any): void;
        readJSON(data: any): void;
        getScreenBounds(camera: Phaser.Cameras.Scene2D.Camera): Phaser.Math.Vector2[];
    }
}
declare namespace phasereditor2d.scene.ui.sceneobjects {
    class ImageEditorSupport extends EditorSupport {
        private _textureKey;
        private _textureFrameKey;
        constructor(obj: Image);
        getTextureKey(): string;
        setTextureKey(key: string): void;
        setTexture(key: string, frame: string | number): void;
        getTexture(): {
            key: string;
            frame: string | number;
        };
        getTextureFrameKey(): string | number;
        setTextureFrame(frame: string | number): void;
    }
}
declare namespace phasereditor2d.scene.ui.sceneobjects {
    class ImageExtension extends SceneObjectExtension {
        constructor();
        static isImageOrImageFrameAsset(data: any): boolean;
        acceptsDropData(data: any): boolean;
        createSceneObjectWithAsset(args: CreateWithAssetArgs): sceneobjects.SceneObject;
        createSceneObjectWithData(args: CreateWithDataArgs): sceneobjects.SceneObject;
        private createImageObject;
    }
}
declare namespace phasereditor2d.scene.ui.sceneobjects {
    interface SceneObject extends Phaser.GameObjects.GameObject, json.ReadWriteJSON {
        getScreenBounds(camera: Phaser.Cameras.Scene2D.Camera): any;
        getEditorSupport(): EditorSupport;
    }
}
declare namespace phasereditor2d.scene.ui.viewers {
    import controls = colibri.ui.controls;
    class SceneFileCellRenderer implements controls.viewers.ICellRenderer {
        renderCell(args: controls.viewers.RenderCellArgs): void;
        cellHeight(args: controls.viewers.RenderCellArgs): number;
        preload(args: controls.viewers.PreloadCellArgs): Promise<controls.PreloadResult>;
    }
}
//# sourceMappingURL=plugin.d.ts.map