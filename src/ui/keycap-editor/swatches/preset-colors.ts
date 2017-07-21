import * as Color from 'color';

const GMK_COLORS = {
  'CR': Color({ r: 23, g: 23, b:24 }),
  'N9': Color({ r: 57, g: 59, b: 59 }),
  'CC': Color({ r: 103, g: 99, b: 91 }),
  '2B': Color({ r: 114, g: 116, b: 116 }),
  'BJ': Color({ r: 145, g: 134, b: 122 }),
  'CB': Color({ r: 155, g: 146, b: 132 }),
  'U9': Color({ r: 172, g: 166, b: 147 }),
  'L9': Color({ r: 216, g: 210, b: 195 }),
  'T9': Color({ r: 195, g: 195, b: 186 }),
  '3K': Color({ r: 204, g: 198, b: 192 }),
  '2M': Color({ r: 198, g: 201, b: 199 }),
  'GR1': Color({ r: 197, g: 199, b: 202 }),
  'CP': Color({ r: 225, g: 219, b: 209 }),
  'WS1': Color({ r: 247, g: 242, b: 234 }),
  'BR1': Color({ r: 101, g: 60, b: 37 }),
  'N7': Color({ r: 0, g: 119, b: 58 }),
  'AE': Color({ r: 104, g: 155, b: 52 }),
  '3B': Color({ r: 118, g: 142, b: 114 }),
  '3A': Color({ r: 127, g: 165, b: 128 }),
  'V4': Color({ r: 0, g: 88, b: 159 }),
  'N5': Color({ r: 0, g: 132, b: 194 }),
  'TU1': Color({ r: 0, g: 98, b: 122 }),
  'TU2': Color({ r: 0, g: 164, b: 169 }),
  'DY': Color({ r: 93, g: 67, b: 126 }),
  'RO1': Color({ r: 141, g: 36, b: 47 }),
  'P3': Color({ r: 188, g: 37, b: 30 }),
  'V1': Color({ r: 208, g: 47, b: 28 }),
  'RO2': Color({ r: 221, g: 17, b: 38 }),
  '3C': Color({ r: 200, g: 126, b: 116 }),
  'MG1': Color({ r: 203, g: 61, b: 110 }),
  'V2': Color({ r: 238, g: 109, b: 0 }),
  'N6': Color({ r: 229, g: 161, b: 0 }),
  'CV': Color({ r: 248, g: 194, b: 0 }),
  'GE1': Color({ r: 235, g: 212, b: 0 }),
};

const GMK_COLOR_NAMES = Object.keys(GMK_COLORS);

const SP_ABS_COLORS = {
  'BBI': Color({ r: 10, g: 32, b: 64 }),
  'BBJ': Color({ r: 0, g: 143, b: 176 }),
  'BBQ': Color({ r: 0, g: 166, b: 180 }),
  'BDG': Color({ r: 54, g: 144, b: 161 }),
  'BDH': Color({ r: 0, g: 86, b: 153 }),
  'BE': Color({ r: 0, g: 111, b: 154 }),
  'BED': Color({ r: 0, g: 54, b: 73 }),
  'BEY': Color({ r: 77, g: 139, b: 146 }),
  'BFJ': Color({ r: 89, g: 145, b: 174 }),
  'BFK': Color({ r: 0, g: 81, b: 144 }),
  'BFL': Color({ r: 87, g: 155, b: 173 }),
  'BFM': Color({ r: 171, g: 198, b: 220 }),
  'BFN': Color({ r: 26, g: 138, b: 183 }),
  'BFO': Color({ r: 157, g: 195, b: 203 }),
  'BFP': Color({ r: 0, g: 115, b: 162 }),
  'BFQ': Color({ r: 102, g: 208, b: 208 }),
  'BFR': Color({ r: 41, g: 54, b: 73 }),
  'BFT': Color({ r: 75, g: 133, b: 153 }),
  'BFU': Color({ r: 0, g: 35, b: 78 }),
  'BGA': Color({ r: 0, g: 70, b: 109 }),
  'BO': Color({ r: 0, g: 76, b: 127 }),
  'BX': Color({ r: 55, g: 135, b: 157 }),
  'GA': Color({ r: 148, g: 147, b: 143 }),
  'GAA': Color({ r: 179, g: 174, b: 161 }),
  'GAL': Color({ r: 200, g: 195, b: 184 }),
  'GAW': Color({ r: 174, g: 163, b: 142 }),
  'GAY': Color({ r: 201, g: 197, b: 186 }),
  'GB': Color({ r: 48, g: 49, b: 46 }),
  'GBA': Color({ r: 168, g: 168, b: 161 }),
  'GC': Color({ r: 85, g: 86, b: 87 }),
  'GCF': Color({ r: 190, g: 182, b: 167 }),
  'GCS': Color({ r: 138, g: 128, b: 111 }),
  'GD': Color({ r: 99, g: 105, b: 106 }),
  'GDC': Color({ r: 109, g: 106, b: 100 }),
  'GDV': Color({ r: 147, g: 140, b: 131 }),
  'GDX': Color({ r: 195, g: 179, b: 156 }),
  'GE': Color({ r: 95, g: 92, b: 82 }),
  'GEA': Color({ r: 176, g: 174, b: 166 }),
  'GEQ': Color({ r: 157, g: 150, b: 130 }),
  'GER': Color({ r: 199, g: 195, b: 181 }),
  'GEV': Color({ r: 147, g: 135, b: 120 }),
  'GEW': Color({ r: 60, g: 64, b: 65 }),
  'GEZ': Color({ r: 161, g: 157, b: 147 }),
  'GFD': Color({ r: 204, g: 196, b: 179 }),
  'GFE': Color({ r: 159, g: 150, b: 133 }),
  'GFW': Color({ r: 150, g: 142, b: 133 }),
  'GG': Color({ r: 123, g: 120, b: 115 }),
  'GGK': Color({ r: 192, g: 181, b: 170 }),
  'GGM': Color({ r: 167, g: 167, b: 162 }),
  'GGT': Color({ r: 194, g: 193, b: 185 }),
  'GJV': Color({ r: 136, g: 127, b: 119 }),
  'GKH': Color({ r: 168, g: 168, b: 166 }),
  'GLK': Color({ r: 189, g: 191, b: 184 }),
  'GLY': Color({ r: 197, g: 189, b: 178 }),
  'GN': Color({ r: 168, g: 166, b: 160 }),
  'GO': Color({ r: 117, g: 116, b: 110 }),
  'GPA': Color({ r: 93, g: 96, b: 96 }),
  'GPR': Color({ r: 198, g: 192, b: 184 }),
  'GQM': Color({ r: 70, g: 71, b: 70 }),
  'GRX': Color({ r: 206, g: 202, b: 188 }),
  'GRY': Color({ r: 151, g: 149, b: 144 }),
  'GSC': Color({ r: 139, g: 142, b: 142 }),
  'GSL': Color({ r: 192, g: 193, b: 189 }),
  'GSM': Color({ r: 69, g: 84, b: 96 }),
  'GSP': Color({ r: 125, g: 129, b: 129 }),
  'GSU': Color({ r: 163, g: 156, b: 148 }),
  'GSX': Color({ r: 169, g: 171, b: 170 }),
  'GSY': Color({ r: 129, g: 124, b: 116 }),
  'GSZ': Color({ r: 55, g: 55, b: 56 }),
  'GTA': Color({ r: 78, g: 81, b: 86 }),
  'GTB': Color({ r: 185, g: 184, b: 174 }),
  'GTC': Color({ r: 149, g: 150, b: 141 }),
  'GTD': Color({ r: 125, g: 124, b: 120 }),
  'GTF': Color({ r: 196, g: 189, b: 172 }),
  'GTG': Color({ r: 146, g: 146, b: 137 }),
  'GTH': Color({ r: 152, g: 153, b: 151 }),
  'GTL': Color({ r: 175, g: 176, b: 177 }),
  'GTM': Color({ r: 149, g: 144, b: 131 }),
  'GTQ': Color({ r: 215, g: 209, b: 193 }),
  'GTR': Color({ r: 199, g: 199, b: 191 }),
  'GTT': Color({ r: 168, g: 159, b: 141 }),
  'GTV': Color({ r: 136, g: 132, b: 119 }),
  'GX': Color({ r: 51, g: 52, b: 48 }),
  'GY': Color({ r: 110, g: 109, b: 107 }),
  'NN': Color({ r: 33, g: 34, b: 36 }),
  'OAS': Color({ r: 255, g: 104, b: 0 }),
  'OAV': Color({ r: 234, g: 66, b: 33 }),
  'OB': Color({ r: 216, g: 55, b: 18 }),
  'OBC': Color({ r: 232, g: 103, b: 0 }),
  'ON': Color({ r: 229, g: 78, b: 0 }),
  'RA': Color({ r: 186, g: 19, b: 18 }),
  'RAC': Color({ r: 164, g: 33, b: 27 }),
  'RAS': Color({ r: 149, g: 0, b: 19 }),
  'RBC': Color({ r: 115, g: 54, b: 54 }),
  'RCJ': Color({ r: 166, g: 152, b: 197 }),
  'RCQ': Color({ r: 193, g: 17, b: 0 }),
  'RCR': Color({ r: 211, g: 123, b: 162 }),
  'RCS': Color({ r: 220, g: 162, b: 200 }),
  'RCU': Color({ r: 221, g: 97, b: 81 }),
  'RDA': Color({ r: 108, g: 59, b: 123 }),
  'RDD': Color({ r: 164, g: 2, b: 20 }),
  'RDE': Color({ r: 89, g: 34, b: 84 }),
  'RN': Color({ r: 165, g: 27, b: 27 }),
  'RR': Color({ r: 202, g: 26, b: 14 }),
  'TAA': Color({ r: 41, g: 33, b: 28 }),
  'TBN': Color({ r: 72, g: 53, b: 39 }),
  'TBT': Color({ r: 190, g: 176, b: 152 }),
  'TEA': Color({ r: 204, g: 177, b: 140 }),
  'TGG': Color({ r: 149, g: 134, b: 111 }),
  'TGH': Color({ r: 91, g: 51, b: 20 }),
  'TM': Color({ r: 217, g: 201, b: 168 }),
  'TN': Color({ r: 202, g: 182, b: 152 }),
  'TU': Color({ r: 200, g: 178, b: 144 }),
  'VAF': Color({ r: 98, g: 153, b: 144 }),
  'VAG': Color({ r: 36, g: 156, b: 120 }),
  'VAT': Color({ r: 147, g: 194, b: 71 }),
  'VAV': Color({ r: 123, g: 155, b: 72 }),
  'VBQ': Color({ r: 97, g: 138, b: 64 }),
  'VBV': Color({ r: 93, g: 206, b: 186 }),
  'VCJ': Color({ r: 0, g: 123, b: 69 }),
  'VCK': Color({ r: 0, g: 141, b: 82 }),
  'VCM': Color({ r: 0, g: 142, b: 67 }),
  'VCO': Color({ r: 105, g: 208, b: 165 }),
  'VCS': Color({ r: 0, g: 121, b: 44 }),
  'VF': Color({ r: 91, g: 124, b: 91 }),
  'VH': Color({ r: 124, g: 148, b: 125 }),
  'VV': Color({ r: 0, g: 93, b: 53 }),
  'WA': Color({ r: 228, g: 222, b: 221 }),
  'WAR': Color({ r: 171, g: 161, b: 139 }),
  'WBO': Color({ r: 227, g: 213, b: 185 }),
  'WCK': Color({ r: 238, g: 226, b: 208 }),
  'WEA': Color({ r: 221, g: 211, b: 192 }),
  'WFK': Color({ r: 229, g: 228, b: 223 }),
  'WFM': Color({ r: 225, g: 216, b: 205 }),
  'WFO': Color({ r: 228, g: 219, b: 204 }),
  'WQ': Color({ r: 220, g: 216, b: 204 }),
  'WV': Color({ r: 218, g: 212, b: 196 }),
  'WW': Color({ r: 224, g: 214, b: 198 }),
  'YBP': Color({ r: 255, g: 172, b: 0 }),
  'YCB': Color({ r: 225, g: 186, b: 68 }),
  'YCC': Color({ r: 245, g: 215, b: 147 }),
  'YCE': Color({ r: 255, g: 219, b: 88 }),
  'YCF': Color({ r: 247, g: 176, b: 60 }),
  'YCH': Color({ r: 242, g: 199, b: 0 }),
  'YG': Color({ r: 192, g: 149, b: 65 }),
  'YL': Color({ r: 212, g: 134, b: 0 }),
  'YW': Color({ r: 196, g: 133, b: 44 }),
  'YY': Color({ r: 248, g: 204, b: 42 }),
  'YCA': Color({ r: 194, g: 192, b: 169 }),
};

const SP_ABS_COLOR_NAMES = Object.keys(SP_ABS_COLORS);

const SP_PBT_COLORS = {
  'BCT': Color({ r: 0, g: 117, b: 173 }),
  'BDJ': Color({ r: 39, g: 144, b: 194 }),
  'BDO': Color({ r: 0, g: 155, b: 202 }),
  'BFB': Color({ r: 0, g: 120, b: 163 }),
  'BFC': Color({ r: 167, g: 208, b: 219 }),
  'BFD': Color({ r: 46, g: 110, b: 166 }),
  'BFE': Color({ r: 149, g: 191, b: 232 }),
  'BFF': Color({ r: 81, g: 192, b: 221 }),
  'BFG': Color({ r: 121, g: 187, b: 236 }),
  'BFH': Color({ r: 64, g: 143, b: 179 }),
  'BFV': Color({ r: 93, g: 205, b: 227 }),
  'BFW': Color({ r: 52, g: 164, b: 185 }),
  'BLACK': Color({ r: 13, g: 13, b: 11 }),
  'GAH': Color({ r: 129, g: 129, b: 126 }),
  'GCA': Color({ r: 180, g: 178, b: 171 }),
  'GCH': Color({ r: 160, g: 152, b: 136 }),
  'GDE': Color({ r: 144, g: 149, b: 150 }),
  'GDL': Color({ r: 172, g: 164, b: 148 }),
  'GDM': Color({ r: 200, g: 196, b: 184 }),
  'GEC': Color({ r: 146, g: 147, b: 144 }),
  'GGX': Color({ r: 174, g: 174, b: 171 }),
  'GHO': Color({ r: 175, g: 176, b: 174 }),
  'GJQ': Color({ r: 130, g: 128, b: 122 }),
  'GJW': Color({ r: 143, g: 135, b: 127 }),
  'GKK': Color({ r: 196, g: 200, b: 197 }),
  'GKL': Color({ r: 155, g: 147, b: 129 }),
  'GKP': Color({ r: 141, g: 136, b: 122 }),
  'GMC': Color({ r: 171, g: 172, b: 171 }),
  'GQC': Color({ r: 161, g: 157, b: 145 }),
  'GQJ': Color({ r: 186, g: 188, b: 186 }),
  'GQN': Color({ r: 195, g: 185, b: 170 }),
  'GQP': Color({ r: 164, g: 157, b: 151 }),
  'GQT': Color({ r: 82, g: 85, b: 84 }),
  'GRA': Color({ r: 193, g: 192, b: 183 }),
  'GRZ': Color({ r: 174, g: 176, b: 176 }),
  'GSE': Color({ r: 123, g: 120, b: 113 }),
  'GSF': Color({ r: 45, g: 50, b: 56 }),
  'GSG': Color({ r: 199, g: 192, b: 181 }),
  'GSJ': Color({ r: 191, g: 192, b: 192 }),
  'GSK': Color({ r: 162, g: 162, b: 166 }),
  'GSN': Color({ r: 186, g: 183, b: 173 }),
  'GSO': Color({ r: 155, g: 152, b: 141 }),
  'GSQ': Color({ r: 130, g: 134, b: 135 }),
  'GTK': Color({ r: 200, g: 193, b: 177 }),
  'GTP': Color({ r: 146, g: 140, b: 125 }),
  'NQ': Color({ r: 43, g: 44, b: 46 }),
  'OAL': Color({ r: 255, g: 109, b: 26 }),
  'OAX': Color({ r: 255, g: 121, b: 33 }),
  'OAY': Color({ r: 255, g: 176, b: 123 }),
  'OAZ': Color({ r: 241, g: 111, b: 59 }),
  'OBB': Color({ r: 255, g: 127, b: 34 }),
  'OT': Color({ r: 244, g: 121, b: 30 }),
  'OW': Color({ r: 192, g: 71, b: 44 }),
  'RAA': Color({ r: 193, g: 60, b: 57 }),
  'RAG': Color({ r: 226, g: 103, b: 87 }),
  'RAR': Color({ r: 203, g: 47, b: 42 }),
  'RBD': Color({ r: 211, g: 25, b: 41 }),
  'RBH': Color({ r: 184, g: 27, b: 36 }),
  'RBR': Color({ r: 205, g: 46, b: 49 }),
  'RCA': Color({ r: 210, g: 144, b: 180 }),
  'RCB': Color({ r: 133, g: 126, b: 177 }),
  'RCC': Color({ r: 209, g: 60, b: 66 }),
  'RCD': Color({ r: 191, g: 186, b: 209 }),
  'RCE': Color({ r: 108, g: 102, b: 128 }),
  'RCF': Color({ r: 199, g: 72, b: 82 }),
  'RCG': Color({ r: 255, g: 178, b: 210 }),
  'RCH': Color({ r: 255, g: 173, b: 206 }),
  'RCK': Color({ r: 200, g: 51, b: 55 }),
  'RCL': Color({ r: 243, g: 150, b: 171 }),
  'RCM': Color({ r: 155, g: 100, b: 130 }),
  'RCP': Color({ r: 205, g: 47, b: 44 }),
  'TGJ': Color({ r: 73, g: 33, b: 13 }),
  'TT': Color({ r: 192, g: 164, b: 128 }),
  'UP': Color({ r: 227, g: 226, b: 221 }),
  'VAL': Color({ r: 108, g: 162, b: 157 }),
  'VAZ': Color({ r: 0, g: 144, b: 87 }),
  'VBD': Color({ r: 147, g: 201, b: 183 }),
  'VCA': Color({ r: 0, g: 152, b: 126 }),
  'VCB': Color({ r: 133, g: 187, b: 168 }),
  'VCC': Color({ r: 69, g: 184, b: 102 }),
  'VCD': Color({ r: 0, g: 109, b: 89 }),
  'VCE': Color({ r: 122, g: 218, b: 189 }),
  'VCG': Color({ r: 11, g: 171, b: 78 }),
  'VCH': Color({ r: 0, g: 164, b: 119 }),
  'VCR': Color({ r: 0, g: 131, b: 62 }),
  'VCT': Color({ r: 11, g: 171, b: 74 }),
  'VS': Color({ r: 36, g: 83, b: 67 }),
  'WAN': Color({ r: 232, g: 231, b: 227 }),
  'WAS': Color({ r: 223, g: 218, b: 207 }),
  'WAT': Color({ r: 194, g: 190, b: 177 }),
  'WBK': Color({ r: 226, g: 219, b: 202 }),
  'WBR': Color({ r: 199, g: 195, b: 180 }),
  'WCS': Color({ r: 195, g: 191, b: 174 }),
  'WCV': Color({ r: 208, g: 198, b: 185 }),
  'WCX': Color({ r: 229, g: 219, b: 202 }),
  'WDG': Color({ r: 241, g: 237, b: 230 }),
  'WFJ': Color({ r: 217, g: 218, b: 224 }),
  'WFN': Color({ r: 200, g: 196, b: 182 }),
  'YAF': Color({ r: 255, g: 224, b: 141 }),
  'YAM': Color({ r: 255, g: 209, b: 0 }),
  'YAS': Color({ r: 249, g: 205, b: 49 }),
  'YBT': Color({ r: 244, g: 220, b: 156 }),
  'YBV': Color({ r: 250, g: 208, b: 61 }),
  'YBX': Color({ r: 213, g: 213, b: 75 }),
  'YBZ': Color({ r: 212, g: 135, b: 42 }),
  'YCJ': Color({ r: 232, g: 169, b: 0 }),
  'YR': Color({ r: 255, g: 193, b: 0 }),
};

const SP_PBT_COLOR_NAMES = Object.keys(SP_PBT_COLORS);

export {
  GMK_COLOR_NAMES,
  GMK_COLORS,
  SP_ABS_COLOR_NAMES,
  SP_ABS_COLORS,
  SP_PBT_COLOR_NAMES,
  SP_PBT_COLORS,
};
