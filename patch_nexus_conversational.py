import sys

with open('server.py', 'r', encoding='utf-8') as f:
    code = f.read()

target = """    # 1. Models query
    if any(k in msg_lower for k in ["list model", "available model", "which model", "agency models", "show models"]):"""

replacement = """    # 0. Intelligent Conversational Greetings & Social Interaction
    greetings = ["hi", "hello", "hey", "greetings", "good morning", "good evening", "good afternoon", "salut", "bonjour", "yo", "nexus"]
    clean_punct = msg_lower.strip(" !.,?:;\"'")
    if clean_punct in greetings or any(clean_punct.startswith(f"{g} ") or clean_punct.startswith(f"{g},") for g in greetings if g != "nexus"):
        import random
        g_replies = [
            "Greetings! I am **Nexus**, your Haute Couture Multi-Agent Art Director. The atelier patternmakers, biometric models, and cinematic rendering stages are ready at your command. Are we tailoring a bespoke garment, draping a lookbook, or directing a cinematic reel today?",
            "Hello! Art Director Nexus at your service. Our digital runway and material synthesis engines are fully calibrated. Tell me your aesthetic vision or select a directive to begin fabricating.",
            "Good day! Nexus online and attentive. Whether you wish to engineer an avant-garde outerwear piece in matte charcoal, drape silk gowns onto our Paris agency models, or render an LTX commercial reel, I am ready to orchestrate."
        ]
        return {
            "reply": random.choice(g_replies),
            "steps": ["Nexus conversational neural intent recognized", "Haute Couture Art Director primed"],
            "action": "chat"
        }

    # Conversational Questions about Nexus or the Atelier
    if any(q in msg_lower for q in ["who are you", "what can you do", "help", "capabilities", "what are you", "what do you do", "tell me about yourself"]):
        return {
            "reply": (
                "I am **Nexus**, your autonomous **Haute Couture Multi-Agent Art Director** for ETHEREAL Studio.\n\n"
                "Here is what I can orchestrate for you in real-time:\n\n"
                "👗 **Bespoke Garment Tailoring**: Direct prompt-to-packshot synthesis with custom textiles, hardware, and silhouettes (*e.g., 'Synthesize an avant-garde techwear parka in matte charcoal'*).\n\n"
                "📸 **Virtual Try-On & Draping**: Drape tailored garments onto any biometric agency model with photorealistic fabric physics.\n\n"
                "✨ **Nemotron Prompt Enhancement**: Expand rough concept briefs into studio-grade photographic directives.\n\n"
                "🎬 **Cinematic Commercial Direction**: Generate 24fps high-fashion video reels with Arri Alexa kinematics and LTX-2.5.\n\n"
                "🏛️ **Model Agency Casting**: Browse and assign models across ethnicities, aesthetics, and proportions."
            ),
            "steps": ["Nexus architectural capabilities indexed"],
            "action": "info"
        }

    # 1. Models query
    if any(k in msg_lower for k in ["list model", "available model", "which model", "agency models", "show models"]):"""

if target in code:
    code = code.replace(target, replacement, 1)
    with open('server.py', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Successfully patched conversational greeting in server.py")
else:
    print("Target not found")
