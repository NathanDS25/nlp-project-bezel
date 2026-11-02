import sys

with open('server.py', 'r', encoding='utf-8') as f:
    code = f.read()

target = """        # Detect color
        color_val = "Camel Cashmere"
        color_hex = "#C19A6B"
        if "emerald" in msg_lower or "green" in msg_lower:
            color_val, color_hex = "Forest Emerald", "#1F382B"
        elif "navy" in msg_lower or "blue" in msg_lower:
            color_val, color_hex = "Midnight Navy", "#0D1B2A"
        elif "noir" in msg_lower or "black" in msg_lower:
            color_val, color_hex = "Obsidian Noir", "#0A0A0A"
        elif "terracotta" in msg_lower:
            color_val, color_hex = "Terracotta Sienna", "#B85D38"
        elif "wine" in msg_lower or "bordeaux" in msg_lower:
            color_val, color_hex = "Bordeaux Wine", "#4A121A"

        # Detect garment type
        g_type = "outerwear"
        if "dress" in msg_lower or "gown" in msg_lower or "slip" in msg_lower:
            g_type = "evening-gown"
        elif "suit" in msg_lower or "blazer" in msg_lower:
            g_type = "blazer-suit"
        elif "blouse" in msg_lower or "shirt" in msg_lower:
            g_type = "blouse-top"
        elif "knitwear" in msg_lower or "sweater" in msg_lower:
            g_type = "knitwear"

        try:
            tailor_req = TailorDesignRequest(
                prompt=enhanced_text,
                garment_type=g_type,
                color=color_val,
                color_hex=color_hex,
                fabric="Double-Faced Cashmere Wool" if "cashmere" in msg_lower else "22-Momme Liquid Silk Charmeuse",
                silhouette="Tailored Architectural",
                hardware="Horn Buttons",
                pattern="Solid Minimalist",
                view_mode="flat-lay"
            )
            garment_res = await design_tailor_garment(tailor_req)
            steps.append(f"👗 Atelier Taylor: Synthesized bespoke {color_val} {g_type}")
            final_img = garment_res.get("image_url")"""

replacement = """        # Smart NLP Garment & Attribute Extraction
        clean_msg = msg
        for trigger in ["synthesize", "design", "drape", "tailor a", "tailor", "create a", "create", "make a", "make"]:
            if clean_msg.lower().startswith(trigger):
                clean_msg = clean_msg[len(trigger):].strip()
                break

        # 1. Color extraction
        color_val = "Matte Charcoal" if "charcoal" in msg_lower else "Obsidian Noir"
        color_hex = "#2B2B2B" if "charcoal" in msg_lower else "#0A0A0A"
        color_map = [
            (["charcoal", "matte charcoal", "graphite", "slate", "carbon"], "Matte Charcoal", "#2B2B2B"),
            (["noir", "black", "obsidian", "dark", "onyx"], "Obsidian Noir", "#0A0A0A"),
            (["white", "bone", "cream", "ivory", "chalk"], "Chalk White", "#F7F7F7"),
            (["silver", "metallic", "chrome", "platinum"], "Liquid Silver", "#C0C0C0"),
            (["grey", "gray", "ash", "heather"], "Heather Grey", "#8E8E93"),
            (["camel", "tan", "sand"], "Camel Cashmere", "#C19A6B"),
            (["emerald", "green", "forest", "moss"], "Forest Emerald", "#1F382B"),
            (["olive", "khaki", "military green"], "Tactical Olive", "#556B2F"),
            (["navy", "blue", "midnight", "cobalt", "indigo"], "Midnight Navy", "#0D1B2A"),
            (["terracotta", "sienna", "clay", "rust"], "Terracotta Sienna", "#B85D38"),
            (["wine", "bordeaux", "burgundy", "maroon"], "Bordeaux Wine", "#4A121A"),
            (["red", "crimson", "scarlet"], "Haute Crimson", "#8B0000"),
            (["gold", "champagne", "ochre", "yellow"], "Champagne Gold", "#D4AF37"),
        ]
        for keywords, c_name, c_hex in color_map:
            if any(k in msg_lower for k in keywords):
                color_val, color_hex = c_name, c_hex
                break

        # 2. Garment type extraction
        g_type = "outerwear"
        type_map = [
            (["parka", "anorak"], "techwear-parka"),
            (["hoodie", "sweatshirt"], "hoodie"),
            (["bomber", "flight jacket"], "bomber-jacket"),
            (["trench", "overcoat", "coat", "peacoat"], "outerwear"),
            (["jacket", "biker jacket", "moto jacket"], "jacket"),
            (["dress", "gown", "slip", "evening gown"], "evening-gown"),
            (["suit", "blazer", "tuxedo"], "blazer-suit"),
            (["pants", "trousers", "cargo", "cargoes", "jeans"], "trousers"),
            (["skirt", "corset"], "skirt"),
            (["blouse", "shirt", "top", "tee", "t-shirt"], "blouse-top"),
            (["knitwear", "sweater", "cardigan", "pullover"], "knitwear"),
        ]
        for keywords, t_name in type_map:
            if any(k in msg_lower for k in keywords):
                g_type = t_name
                break

        # 3. Fabric extraction
        fabric_val = "Technical Weatherproof Ripstop Nylon" if any(k in msg_lower for k in ["techwear", "parka", "nylon", "weatherproof", "gore-tex"]) else "Double-Faced Cashmere Wool"
        fabric_map = [
            (["techwear", "gore-tex", "ripstop", "nylon", "weatherproof", "cordura"], "Technical Weatherproof Ripstop Nylon"),
            (["cashmere"], "Double-Faced Cashmere Wool"),
            (["silk", "charmeuse", "satin"], "22-Momme Liquid Silk Charmeuse"),
            (["leather", "biker", "lambskin"], "Full-Grain Supple Lambskin Leather"),
            (["wool", "tweed"], "Heavyweight Architectural Melton Wool"),
            (["cotton", "fleece", "terry"], "500 GSM Heavyweight French Terry Cotton"),
            (["denim"], "14oz Japanese Selvedge Raw Denim"),
            (["velvet"], "Plush Silk-Rayon Velvet"),
            (["linen"], "Crisp European Flax Linen"),
        ]
        for keywords, f_name in fabric_map:
            if any(k in msg_lower for k in keywords):
                fabric_val = f_name
                break

        # 4. Hardware extraction
        hardware_val = "Matte Black YKK Zippers & Fidlock Tactical Buckles" if any(k in msg_lower for k in ["techwear", "parka", "zipper", "tactical"]) else "Horn Buttons & Concealed Placket"
        if "silver" in msg_lower or "chrome" in msg_lower:
            hardware_val = "Polished Silver RiRi Zippers & Metal Snaps"
        elif "gold" in msg_lower or "brass" in msg_lower:
            hardware_val = "Brushed Antique Brass Hardware"
        elif "horn" in msg_lower or "button" in msg_lower:
            hardware_val = "Genuine Horn Buttons & Concealed Placket"

        # 5. Silhouette extraction
        sil_val = "Oversized Avant-Garde" if any(k in msg_lower for k in ["oversized", "avant-garde", "loose", "baggy"]) else "Tailored Architectural"
        if "slim" in msg_lower or "fitted" in msg_lower:
            sil_val = "Fitted Structured"
        elif "relaxed" in msg_lower:
            sil_val = "Relaxed Fluid"

        try:
            tailor_req = TailorDesignRequest(
                prompt=clean_msg,
                garment_type=g_type,
                color=color_val,
                color_hex=color_hex,
                fabric=fabric_val,
                silhouette=sil_val,
                hardware=hardware_val,
                pattern="Solid Minimalist",
                view_mode="flat-lay"
            )
            garment_res = await design_tailor_garment(tailor_req)
            steps.append(f"👗 Atelier Taylor: Synthesized bespoke {color_val} {g_type} ({fabric_val})")
            final_img = garment_res.get("image_url")"""

code_norm = code.replace("\r\n", "\n")
target_norm = target.replace("\r\n", "\n")
replacement_norm = replacement.replace("\r\n", "\n")

if target_norm in code_norm:
    code_norm = code_norm.replace(target_norm, replacement_norm, 1)
    with open('server.py', 'w', encoding='utf-8') as f:
        f.write(code_norm)
    print("Successfully replaced in server.py")
else:
    print("Target not found in server.py")

