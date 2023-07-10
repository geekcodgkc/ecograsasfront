import Typography from 'typography'

const typography = new Typography({
    baseFontSize: '18px',
    baseLineHeight: 1.66,
    headerFontFamily: [
        'Poppins',
        'Roboto',
        'Arial'
    ],
    bodyFontFamily: [
        'Poppins',
        'Oxygen',
    ],
    googleFonts: [
        {
            name: 'Roboto',
            styles: [
                '700',
                '500',
                '400',
                '300',
            ]
        },
        {
            name: 'Poppins',
            styles: [
                '900',
                '800',
                '700',
                '600',
                '500',
                '400',
                '300',
            ]
        }
    ]
})

export default typography