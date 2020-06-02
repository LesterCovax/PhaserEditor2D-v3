namespace phasereditor2d.scene.ui.sceneobjects {

    import code = core.code;

    export class StringPropertyType extends UserPropertyType<string> {

        constructor() {
            super("string", "");
        }

        buildCode(prop: UserProperty, value: string): code.MemberDeclCodeDOM[] {

            return [this.buildStringFieldCode(prop, value)];
        }

        getName() {

            return "String";
        }

        renderValue(value: string): string {

            return value;
        }

        createEditorElement(getValue: () => any, setValue: (value: any) => void): IPropertyEditor {

            const element = document.createElement("input");
            element.type = "text";
            element.classList.add("formText");

            element.addEventListener("change", e => {

                setValue(element.value);
            });

            const update = () => {

                element.value = getValue();
            };

            return {
                element,
                update
            };
        }

    }
}