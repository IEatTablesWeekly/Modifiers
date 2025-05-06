from PIL import Image
import os

glyph_file = "glyph_E5.png"
sprite_folder = "sprite"
glyph_size = 16
sheet_size = 256
slots_per_row = sheet_size // glyph_size
max_slots = slots_per_row ** 2

base_dir = os.path.dirname(os.path.abspath(__file__))
glyph_path = os.path.join(base_dir, glyph_file)
sprite_path = os.path.join(base_dir, sprite_folder)

if os.path.exists(glyph_path):
    glyph_sheet = Image.open(glyph_path).convert("RGBA")
else:
    glyph_sheet = Image.new("RGBA", (sheet_size, sheet_size), (0, 0, 0, 0))

new_sprites = sorted([
    f for f in os.listdir(sprite_path)
    if f.endswith(".png")
])

def slot_is_filled(x, y):
    box = glyph_sheet.crop((x, y, x + glyph_size, y + glyph_size))
    return any(pixel[3] != 0 for pixel in box.getdata())

def find_next_free_slot():
    for i in range(max_slots):
        x = (i % slots_per_row) * glyph_size
        y = (i // slots_per_row) * glyph_size
        if not slot_is_filled(x, y):
            yield (x, y)

free_slots = find_next_free_slot()

def find_visual_bbox(img):
    data = img.getdata()
    w, h = img.size
    min_x, min_y = w, h
    max_x, max_y = 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            r, g, b, a = data[y * w + x]
            if a > 16 and (r + g + b) > 8:
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)
                found = True
    if found:
        return (min_x, min_y, max_x + 1, max_y + 1)
    return None

def process_sprite(full_path):
    sprite = Image.open(full_path).convert("RGBA")
    bbox = find_visual_bbox(sprite)
    if not bbox:
        return None

    cropped = sprite.crop(bbox)
    cw, ch = cropped.size

    scale = min(glyph_size / cw, glyph_size / ch)
    new_size = (int(cw * scale), int(ch * scale))
    scaled = cropped.resize(new_size, Image.NEAREST)

    canvas = Image.new("RGBA", (glyph_size, glyph_size), (0, 0, 0, 0))
    paste_x = (glyph_size - new_size[0]) // 2
    paste_y = (glyph_size - new_size[1]) // 2
    canvas.paste(scaled, (paste_x, paste_y))

    return canvas

added = 0
for filename in new_sprites:
    full_path = os.path.join(sprite_path, filename)
    processed = process_sprite(full_path)
    if processed is None:
        print(f"⚠️ Skipping blank: {filename}")
        continue
    try:
        x, y = next(free_slots)
    except StopIteration:
        print("❌ No space left in glyph sheet!")
        break
    glyph_sheet.paste(processed, (x, y))
    added += 1

glyph_sheet.save(glyph_path)
print(f"✅ Added {added} glyphs to '{glyph_file}' from '{sprite_folder}/'")
