with open('frontend/src/components/AtelierCommercialVideo.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

old_body = '''        body: JSON.stringify({
          concept,
          camera_preset: cameraPreset,'''

new_body = '''        body: JSON.stringify({
          concept,
          mode: 'ltx',
          camera_preset: cameraPreset,'''

content = content.replace(old_body, new_body, 1)

old_status1 = "setStatusMessage('Calibrating Arri Optical Stage & Minimax H3 Kinematics...');"
new_status1 = "setStatusMessage('Connecting to ComfyUI LTX-2.5 Video Engine...');"
content = content.replace(old_status1, new_status1, 1)

old_status2 = "setStatusMessage('Sampling 8-Step Latent Video Trajectories (24 fps)...');"
new_status2 = "setStatusMessage('LTX-2.5 DiT Sampling Physical Video Latents (24 fps)...');"
content = content.replace(old_status2, new_status2, 1)

with open('frontend/src/components/AtelierCommercialVideo.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("ATELIERCOMMERCIALVIDEO UPDATED")

