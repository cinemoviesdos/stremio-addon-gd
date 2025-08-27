import subprocess

def update_stremio():
    try:
        subprocess.run(['stremio', '--update'], check=True)
        print("Stremio actualizado correctamente.")
    except subprocess.CalledProcessError as e:
        print(f"Error al actualizar Stremio: {e}")
