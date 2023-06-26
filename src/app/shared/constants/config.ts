export const configAngularEditor = {
    editable: true,
    spellcheck: true,
    height: '5rem',
    minHeight: '5rem',
    placeholder: '',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
   

    toolbarHiddenButtons: [['bold']],
    customClasses: [
        {
            name: 'quote',
            class: 'quote',
        },
        {
            name: 'redText',
            class: 'redText',
        },
        {
            name: 'titleText',
            class: 'titleText',
            tag: 'h1',
        },
    ],
}