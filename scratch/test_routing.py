test_prompts = [
    'Liquid silver evening gown with chrome fluid reflections',
    'Bordeaux velvet cape with gold embroidery',
    'Oversized cloud tulle ballgown in baby blue on runway',
    'Streetwear designer sneakers unboxing review',
    'Dewy glass skin skincare serum cosmetic close-up',
    'Tailored black cashmere suit on windy rooftop',
    'A luxury runway model walking in high fashion lookbook'
]

import sys, os
sys.path.append(os.path.abspath("."))
import scratch.test_motion_pipeline as tmp

for p in test_prompts:
    matched = tmp.match_motion_source(p)
    print(f'Prompt: "{p}"')
    print(f'   --> Matched: {matched["id"]} ({matched["path"]})\n')
