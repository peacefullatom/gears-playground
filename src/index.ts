import Gear from "./gear";
import { ITree } from "./types";
import { GearShape } from "./gear.types";

const gears: Gear[] = [];
const app = document.getElementById("app");
const tree: ITree[] = [];
let frame: HTMLDivElement;

function addGear(): void {
  if (!frame) {
    frame = document.getElementById("frame") as HTMLDivElement;
  }
  if (frame) {
    gears.push(new Gear({ parent: frame }));
    updateTable();
  }
}

function removeGear(index: number): void {
  gears.splice(index, 1);
  updateTable();
}

function updateTable(): void {
  const tbody = document.getElementById("tbody");
  if (tbody) {
    const data: ITree[] = [];
    gears.forEach((gear, index) => {
      const branch: ITree = {
        tr: {
          children: [
            { td: { props: { innerText: index + 1 } } },
            {
              td: {
                children: [
                  {
                    input: {
                      props: {
                        type: "number",
                        step: 1,
                        min: -10000,
                        max: 10000,
                        value: gear.left,
                        oninput: (value: Event) =>
                          gear.setLeft(
                            parseInt(
                              (value.currentTarget as HTMLInputElement).value,
                              10
                            )
                          )
                      }
                    }
                  }
                ]
              }
            },
            {
              td: {
                children: [
                  {
                    input: {
                      props: {
                        type: "number",
                        step: 1,
                        min: -10000,
                        max: 10000,
                        value: gear.top,
                        oninput: (value: Event) =>
                          gear.setTop(
                            parseInt(
                              (value.currentTarget as HTMLInputElement).value,
                              10
                            )
                          )
                      }
                    }
                  }
                ]
              }
            },
            {
              td: {
                children: [
                  {
                    input: {
                      props: {
                        type: "number",
                        min: 1,
                        max: 10,
                        step: 1,
                        value: gear.radius,
                        oninput: (value: Event) =>
                          gear.setRadius(
                            parseInt(
                              (value.currentTarget as HTMLInputElement).value,
                              10
                            )
                          )
                      }
                    }
                  }
                ]
              }
            },
            {
              td: {
                children: [
                  {
                    input: {
                      props: {
                        type: "number",
                        min: 3,
                        max: 72,
                        step: 1,
                        value: gear.teeth,
                        oninput: (value: Event) =>
                          gear.setTeeth(
                            parseInt(
                              (value.currentTarget as HTMLInputElement).value,
                              10
                            )
                          )
                      }
                    }
                  }
                ]
              }
            },
            {
              td: {
                children: [
                  {
                    input: {
                      props: {
                        type: "number",
                        min: 10,
                        max: 30,
                        step: 1,
                        value: gear.height,
                        oninput: (value: Event) =>
                          gear.setHeight(
                            parseInt(
                              (value.currentTarget as HTMLInputElement).value,
                              10
                            )
                          )
                      }
                    }
                  }
                ]
              }
            },
            {
              td: {
                children: [
                  {
                    select: {
                      props: {
                        oninput: (value: Event) =>
                          gear.setShape(
                            (value.currentTarget as HTMLInputElement)
                              .value as GearShape
                          )
                      },
                      children: [
                        {
                          option: {
                            props: {
                              selected: "selected",
                              value: "square",
                              innerText: "square"
                            }
                          }
                        },
                        {
                          option: {
                            props: {
                              value: "circle",
                              innerText: "circle"
                            }
                          }
                        },
                        {
                          option: {
                            props: {
                              value: "triangle",
                              innerText: "triangle"
                            }
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              td: {
                children: [
                  {
                    input: {
                      props: {
                        type: "number",
                        min: 1,
                        max: 10,
                        step: 1,
                        value: gear.thickness,
                        oninput: (value: Event) =>
                          gear.setThickness(
                            parseInt(
                              (value.currentTarget as HTMLInputElement).value,
                              10
                            )
                          )
                      }
                    }
                  }
                ]
              }
            },
            {
              td: {
                children: [
                  {
                    input: {
                      props: {
                        type: "number",
                        min: 0,
                        max: 360,
                        step: 5,
                        value: gear.angle,
                        oninput: (value: Event) =>
                          gear.setAngle(
                            parseInt(
                              (value.currentTarget as HTMLInputElement).value,
                              10
                            )
                          )
                      }
                    }
                  }
                ]
              }
            },
            {
              td: {
                children: [
                  {
                    input: {
                      props: {
                        type: "text",
                        value: gear.label,
                        oninput: (value: Event) =>
                          gear.setLabel(
                            (value.currentTarget as HTMLInputElement).value
                          )
                      }
                    }
                  }
                ]
              }
            },
            {
              td: {
                children: [
                  {
                    button: {
                      props: {
                        innerText: "remove",
                        onclick: () => removeGear(index)
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      };
      data.push(branch);
    });
    tbody.innerHTML = null;
    build(tbody, data);
  }
}

function build(container: Element, tree: ITree[]): void {
  if (container && tree instanceof Array) {
    tree.forEach(branch => {
      Object.keys(branch).forEach(leaf => {
        const element = document.createElement(leaf);
        const { props, children } = branch[leaf];

        if (props) {
          Object.keys(props).forEach(key => {
            const prop = props[key];
            if (typeof prop !== "object") {
              element[key] = prop;
            }
          });
        }

        build(element, children);

        branch[leaf].reference = element;

        container.appendChild(element);
      });
    });
  }
}

function init(): void {
  tree.push(
    {
      div: { props: { className: "frame", id: "frame" } }
    },
    { br: {} },
    {
      button: { props: { innerText: "add gear", onclick: () => addGear() } }
    },
    {
      table: {
        children: [
          {
            thead: {
              children: [
                { th: { props: { innerText: "#" } } },
                { th: { props: { innerText: "left" } } },
                { th: { props: { innerText: "top" } } },
                { th: { props: { innerText: "radius" } } },
                { th: { props: { innerText: "teeth" } } },
                { th: { props: { innerText: "height" } } },
                { th: { props: { innerText: "shape" } } },
                { th: { props: { innerText: "thickness" } } },
                { th: { props: { innerText: "angle" } } },
                { th: { props: { innerText: "label" } } },
                { th: { props: { innerText: "control" } } }
              ]
            }
          },
          { tbody: { props: { id: "tbody" } } }
        ]
      }
    }
  );

  build(app, tree);
}

init();
