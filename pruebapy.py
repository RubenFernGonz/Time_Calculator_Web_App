import math
import numpy as np
import matplotlib.pyplot as plt

theta_spacing = 0.07
phi_spacing = 0.02

R1 = 1
R2 = 2
K2 = 5

screen_width = 80
screen_height = 24

# Calculate K1 based on screen size
K1 = screen_width * K2 * 3 / (8 * (R1 + R2))

def render_frame(A, B):
    cosA = math.cos(A)
    sinA = math.sin(A)
    cosB = math.cos(B)
    sinB = math.sin(B)

    output = [[' ' for _ in range(screen_width)] for _ in range(screen_height)]
    zbuffer = [[0 for _ in range(screen_width)] for _ in range(screen_height)]

    for theta in np.arange(0, 2 * np.pi, theta_spacing):
        costheta = np.cos(theta)
        sintheta = np.sin(theta)

        for phi in np.arange(0, 2 * np.pi, phi_spacing):
            cosphi = np.cos(phi)
            sinphi = np.sin(phi)

            circlex = R2 + R1 * costheta
            circley = R1 * sintheta

            x = circlex * (cosB * cosphi + sinA * sinB * sinphi) - circley * cosA * sinB
            y = circlex * (sinB * cosphi - sinA * cosB * sinphi) + circley * cosA * cosB
            z = K2 + cosA * circlex * sinphi + circley * sinA
            ooz = 1 / z

            xp = int(screen_width / 2 + K1 * ooz * x)
            yp = int(screen_height / 2 - K1 * ooz * y)

            L = cosphi * costheta * sinB - cosA * costheta * sinphi - sinA * sintheta + cosB * (cosA * sintheta - costheta * sinA * sinphi)

            if L > 0:
                if ooz > zbuffer[xp][yp]:
                    zbuffer[xp][yp] = ooz
                    luminance_index = int(L * 8)
                    output[xp][yp] = ".,-~:;=!*#$@"[luminance_index]

    plt.imshow(output, cmap='gray', origin='lower')
    plt.axis('off')
    plt.show()

# Ejemplo de uso:
render_frame(0, 0)