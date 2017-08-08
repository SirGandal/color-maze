export default class Utils {
    static GetColorFromInitial(colorInitial: string, opacity: number = 1) {
        if (colorInitial.toLowerCase() === 'y') {
            return `rgba(255, 255, 0, ${opacity})`;
        }

        if (colorInitial.toLowerCase() === 'g') {
            return `rgba(0, 255, 0, ${opacity})`;
        }

        if (colorInitial.toLowerCase() === 'r') {
            return `rgba(255, 0, 0, ${opacity})`;
        }

        if (colorInitial.toLowerCase() === 'b') {
            return `rgba(0, 0, 255, ${opacity})`;
        }

        if (colorInitial.toLowerCase() === 'p') {
            return `rgba(255, 192, 203, ${opacity})`;
        }

        if (colorInitial.toLowerCase() === 'o') {
            return `rgba(255, 165, 0, ${opacity})`;
        }

        return 'white';
    }
}