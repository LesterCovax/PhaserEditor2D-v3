namespace phasereditor2d.pack.ui.properties {

    import controls = colibri.ui.controls;

    export class AssetPackPreviewPropertyProvider extends controls.properties.PropertySectionProvider {

        addSections(
            page: controls.properties.PropertyPage, sections: Array<controls.properties.PropertySection<any>>): void {

            sections.push(new pack.ui.properties.AssetPackItemSection(page));
            sections.push(new pack.ui.properties.AtlasFrameInfoSection(page));
            sections.push(new pack.ui.properties.ImagePreviewSection(page));
            sections.push(new pack.ui.properties.ManyImagePreviewSection(page));
            sections.push(new pack.ui.properties.BitmapFontPreviewSection(page));
            sections.push(new pack.ui.properties.ManyBitmapFontPreviewSection(page));

            const provider = new files.ui.views.FilePropertySectionProvider();

            provider.addSections(page, sections);
        }
    }
}