/// <reference path="../controls/TabPane.ts" />

namespace colibri.ui.ide {

    export class PartFolder extends controls.TabPane {

        constructor(...classList: string[]) {
            super("PartsTabPane", ...classList);

            this.addEventListener(controls.EVENT_CONTROL_LAYOUT, (e: CustomEvent) => {
                const content = this.getSelectedTabContent();
                if (content) {
                    content.layout();
                }
            })

            this.addEventListener(controls.EVENT_TAB_CLOSED, (e: CustomEvent) => {
                const part = <Part>e.detail;

                if (part.onPartClosed()) {
                    if (this.getContentList().length === 1) {
                        Workbench.getWorkbench().setActivePart(null);
                        if (this instanceof EditorArea) {
                            Workbench.getWorkbench().setActiveEditor(null);
                        }
                    }
                } else {
                    e.preventDefault();
                }
            });

            this.addEventListener(controls.EVENT_TAB_SELECTED, (e: CustomEvent) => {

                const part = <Part>e.detail;

                Workbench.getWorkbench().setActivePart(part);

                part.onPartShown();
            });

            this.addEventListener(controls.EVENT_TAB_LABEL_RESIZED, (e: CustomEvent) => {

                for (const part of this.getParts()) {

                    part.dispatchTitleUpdatedEvent();
                }
            });
        }

        addPart(part: Part, closeable = false, selectIt = true): void {

            part.addEventListener(EVENT_PART_TITLE_UPDATED, (e: CustomEvent) => {

                const icon = part.getIcon();

                if (icon) {

                    icon.preload().then(()=> {
                        this.setTabTitle(part, part.getTitle(), icon);
                    });

                } else {

                    this.setTabTitle(part, part.getTitle(), null);
                }
            });

            this.addTab(part.getTitle(), part.getIcon(), part, closeable, selectIt);

            part.setPartFolder(this);

            part.onPartAdded();

            // we do this here because the icon can be computed with the input.
            part.dispatchTitleUpdatedEvent();
        }

        getParts(): Part[] {
            return this.getContentList() as Part[];
        }
    }

}