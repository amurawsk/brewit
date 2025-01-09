import os
import re
import sys
def extract_css_classes(css_content):
    """Ekstrahuje klasy CSS z treści pliku."""
    return re.findall(r'\.(\w[\w-]*)\s*{', css_content)

def extract_used_classes(jsx_content):
    """Ekstrahuje używane klasy CSS z treści pliku JSX."""
    return set(re.findall(r'styles\.(\w+)', jsx_content))

def find_unused_styles(directory):
    """Znajduje nieużywane style w plikach CSS w porównaniu z JSX."""
    results = []

    # Iteracja po plikach w katalogu
    for file in os.listdir(directory):
        if file.endswith('.module.css'):
            css_file_path = os.path.join(directory, file)
            jsx_file_path = css_file_path.replace('.module.css', '.jsx')

            # Sprawdzanie, czy odpowiadający plik JSX istnieje
            if os.path.exists(jsx_file_path):
                with open(css_file_path, 'r', encoding='utf-8') as css_file:
                    css_content = css_file.read()
                with open(jsx_file_path, 'r', encoding='utf-8') as jsx_file:
                    jsx_content = jsx_file.read()

                css_classes = extract_css_classes(css_content)
                used_classes = extract_used_classes(jsx_content)

                # Porównanie klas CSS z użytymi w JSX
                unused_classes = [cls for cls in css_classes if cls not in used_classes]
                if unused_classes:
                    results.append({
                        'css_file': file,
                        'unused_classes': unused_classes
                    })
                print(f'Analyzed file {file}')

    return results

if __name__ == "__main__":
    directory = sys.argv[1]
    unused_styles = find_unused_styles(directory)

    if unused_styles:
        for result in unused_styles:
            print(f"Plik CSS: {result['css_file']}")
            print("Nieużywane klasy:")
            for cls in result['unused_classes']:
                print(f"  - {cls}")
    else:
        print("Nie znaleziono nieużywanych klas CSS.")