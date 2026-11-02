path = r"frontend/src/components/DigitalAtelierHub.jsx"

with open(path, "r", encoding="utf-8") as f:
    text = f.read()

target = '''        const data = await res.json();
        setTrayItems(data || []);

        // Auto-display the premier shoot of model wearing coat if canvas is not set
        if (!activeCanvasImage && data && data.length > 0) {
          const coatShoot = data.find(item => 
            (item.local_image_path && item.local_image_path.toLowerCase().includes('shoot_camel_cashmere_coat')) ||
            (item.garment_name && item.garment_name.toLowerCase().includes('camel_cashmere_coat'))
          ) || data[0];
          
          const imgUrl = coatShoot.local_image_path
            ? `/${coatShoot.local_image_path.replace(/\\\\/g, '/').replace(/^\\/+/, '')}`
            : (coatShoot.image_url || `/api/duckdb/photo/${coatShoot.shoot_id}`);
            
          setActiveCanvasImage(imgUrl);
          const foundIdx = data.indexOf(coatShoot);
          setSelectedTrayIndex(foundIdx >= 0 ? foundIdx : 0);
          setRenderResult({
            local_image_path: coatShoot.local_image_path,
            image_url: imgUrl,
            prompt: coatShoot.prompt_used || coatShoot.prompt || coatShoot.brief || 'South Asian model wearing tailored camel cashmere coat',
            elapsed_sec: coatShoot.render_time_sec || coatShoot.elapsed_sec || 2.5
          });
        }'''

replacement = '''        const data = await res.json();
        // FILTER: Only keep valid visual renders (exclude raw .mp4 video files and flat garments)
        const validPhotos = (data || []).filter(item => {
          const p = (item.local_image_path || item.image_url || '').toLowerCase();
          return !p.endsWith('.mp4') && !p.includes('assets/garments') && !p.includes('assets\\\\garments');
        });
        setTrayItems(validPhotos);

        // Auto-display the premier successful shoot (tailored camel cashmere coat or hero look)
        if (!activeCanvasImage && validPhotos.length > 0) {
          const premierShoot = validPhotos.find(item => 
            item.local_image_path && item.local_image_path.toLowerCase().includes('shoot_camel_cashmere_coat')
          ) || validPhotos.find(item => 
            item.local_image_path && item.local_image_path.toLowerCase().includes('hero_frame')
          ) || validPhotos[0];
          
          const imgUrl = premierShoot.local_image_path
            ? `/${premierShoot.local_image_path.replace(/\\\\/g, '/').replace(/^\\/+/, '')}`
            : (premierShoot.image_url || `/api/duckdb/photo/${premierShoot.shoot_id}`);
            
          setActiveCanvasImage(imgUrl);
          const foundIdx = validPhotos.indexOf(premierShoot);
          setSelectedTrayIndex(foundIdx >= 0 ? foundIdx : 0);
          setRenderResult({
            local_image_path: premierShoot.local_image_path,
            image_url: imgUrl,
            prompt: premierShoot.prompt_used || premierShoot.prompt || premierShoot.brief || 'South Asian model wearing tailored camel cashmere coat',
            elapsed_sec: premierShoot.render_time_sec || premierShoot.elapsed_sec || 2.5
          });
        }'''

if target in text:
    text = text.replace(target, replacement)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print("Successfully patched DigitalAtelierHub.jsx tray history filter and canvas selector!")
else:
    print("Target block not matched directly, checking formatting...")

