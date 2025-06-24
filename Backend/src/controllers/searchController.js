import Product from "../models/products.js";
import Category from "../models/category.js";
import mongoose from "mongoose";

// Price-related keywords and their variations
const PRICE_KEYWORDS = {
  under: ['under', 'below', 'less than', 'upto', 'maximum', 'max', 'not more than', 'within', 'within budget of', 'budget', 'cheaper than', 'lower than'],
  above: ['above', 'more than', 'minimum', 'min', 'starting from', 'from', 'at least', 'higher than', 'costlier than', 'expensive than'],
  between: ['between', 'from', 'range', 'ranging', 'in range', 'price range', 'cost range', 'budget range', 'priced between', 'costing between'],
  and: ['and', 'to', '-', 'till', 'until', 'up to']
};

// Material-related keywords and their variations
const MATERIAL_KEYWORDS = {
  gold: {
    types: ['gold', 'golden', 'yellow gold', 'white gold', 'rose gold', 'pink gold', 'red gold', 'green gold', 'black gold'],
    variations: ['golden jewelry', 'gold jewelry', 'gold items', 'gold products', 'gold pieces', 'gold collection', 'gold ornaments', 'gold accessories'],
    synonyms: ['golden', 'golden colored', 'gold plated', 'gold filled', 'gold tone', 'golden tone', 'golden shade']
  },
  silver: {
    types: ['silver', 'sterling silver', 'pure silver', 'fine silver', 'silver plated', 'silver filled'],
    variations: ['silver jewelry', 'silver items', 'silver products', 'silver pieces', 'silver collection', 'silver ornaments', 'silver accessories'],
    synonyms: ['silvery', 'silver colored', 'silver tone', 'silver shade']
  },
  platinum: {
    types: ['platinum', 'platinum plated', 'platinum filled'],
    variations: ['platinum jewelry', 'platinum items', 'platinum products', 'platinum pieces', 'platinum collection', 'platinum ornaments'],
    synonyms: ['platinum colored', 'platinum tone', 'platinum shade']
  },
  diamond: {
    types: ['diamond', 'diamonds', 'diamond cut', 'diamond studded', 'diamond encrusted'],
    variations: ['diamond jewelry', 'diamond items', 'diamond products', 'diamond pieces', 'diamond collection', 'diamond ornaments'],
    synonyms: ['diamond like', 'diamond look', 'diamond style']
  },
  pearl: {
    types: ['pearl', 'pearls', 'freshwater pearl', 'south sea pearl', 'tahitian pearl'],
    variations: ['pearl jewelry', 'pearl items', 'pearl products', 'pearl pieces', 'pearl collection', 'pearl ornaments'],
    synonyms: ['pearly', 'pearl like', 'pearl look']
  },
  ruby: {
    types: ['ruby', 'rubies', 'ruby stone', 'ruby gem'],
    variations: ['ruby jewelry', 'ruby items', 'ruby products', 'ruby pieces', 'ruby collection', 'ruby ornaments'],
    synonyms: ['ruby colored', 'ruby red', 'ruby tone']
  },
  sapphire: {
    types: ['sapphire', 'sapphires', 'sapphire stone', 'sapphire gem'],
    variations: ['sapphire jewelry', 'sapphire items', 'sapphire products', 'sapphire pieces', 'sapphire collection', 'sapphire ornaments'],
    synonyms: ['sapphire blue', 'sapphire colored', 'sapphire tone']
  },
  emerald: {
    types: ['emerald', 'emeralds', 'emerald stone', 'emerald gem'],
    variations: ['emerald jewelry', 'emerald items', 'emerald products', 'emerald pieces', 'emerald collection', 'emerald ornaments'],
    synonyms: ['emerald green', 'emerald colored', 'emerald tone']
  }
};

// Product type keywords and their variations
const PRODUCT_TYPE_KEYWORDS = {
  ring: {
    types: ['ring', 'rings', 'band', 'bands', 'finger ring', 'finger rings'],
    variations: ['ring collection', 'ring set', 'ring piece', 'ring design', 'ring style'],
    synonyms: ['ring like', 'ring shaped', 'ring style']
  },
  necklace: {
    types: ['necklace', 'necklaces', 'chain', 'chains', 'pendant', 'pendants', 'neck piece', 'neck pieces', 'choker', 'chokers'],
    variations: ['necklace collection', 'necklace set', 'necklace piece', 'necklace design', 'necklace style'],
    synonyms: ['neck piece', 'neck wear', 'neck accessory']
  },
  bracelet: {
    types: ['bracelet', 'bracelets', 'bangle', 'bangles', 'wrist band', 'wrist bands', 'wristlet', 'wristlets'],
    variations: ['bracelet collection', 'bracelet set', 'bracelet piece', 'bracelet design', 'bracelet style'],
    synonyms: ['wrist piece', 'wrist wear', 'wrist accessory']
  },
  earring: {
    types: ['earring', 'earrings', 'stud', 'studs', 'ear piece', 'ear pieces', 'ear drop', 'ear drops'],
    variations: ['earring collection', 'earring set', 'earring pair', 'earring design', 'earring style'],
    synonyms: ['ear piece', 'ear wear', 'ear accessory']
  },
  anklet: {
    types: ['anklet', 'anklets', 'ankle chain', 'ankle chains', 'ankle bracelet', 'ankle bracelets'],
    variations: ['anklet collection', 'anklet set', 'anklet piece', 'anklet design', 'anklet style'],
    synonyms: ['ankle piece', 'ankle wear', 'ankle accessory']
  },
  brooch: {
    types: ['brooch', 'brooches', 'pin', 'pins', 'clasp', 'clasps'],
    variations: ['brooch collection', 'brooch set', 'brooch piece', 'brooch design', 'brooch style'],
    synonyms: ['pin piece', 'pin wear', 'pin accessory']
  },
  jewelry: {
    types: ['jewelry', 'jewellery', 'jewels', 'jewel', 'ornaments', 'ornament', 'accessories', 'accessory'],
    variations: ['jewelry collection', 'jewelry set', 'jewelry piece', 'jewelry design', 'jewelry style'],
    synonyms: ['ornament', 'adornment', 'decoration', 'accessory']
  }
};

// Helper function to extract price range from natural language
const extractPriceRange = (query) => {
  const pricePatterns = {
    under: new RegExp(`(?:${PRICE_KEYWORDS.under.join('|')})\\s+(\\d+)`, 'i'),
    above: new RegExp(`(?:${PRICE_KEYWORDS.above.join('|')})\\s+(\\d+)`, 'i'),
    between: new RegExp(`(?:${PRICE_KEYWORDS.between.join('|')})\\s+(\\d+)\\s+(?:${PRICE_KEYWORDS.and.join('|')})\\s+(\\d+)`, 'i'),
    range: new RegExp(`(\\d+)\\s*(?:${PRICE_KEYWORDS.and.join('|')})\\s*(\\d+)`, 'i')
  };

  for (const [type, pattern] of Object.entries(pricePatterns)) {
    const match = query.match(pattern);
    if (match) {
      switch (type) {
        case 'under':
          return { $lte: parseInt(match[1]) };
        case 'above':
          return { $gte: parseInt(match[1]) };
        case 'between':
        case 'range':
          return { $gte: parseInt(match[1]), $lte: parseInt(match[2]) };
      }
    }
  }
  return null;
};

// Helper function to extract material keywords with variations
const extractMaterials = (query) => {
  const foundMaterials = [];
  const words = query.toLowerCase().split(/\s+/);
  const queryLower = query.toLowerCase();

  for (const [material, keywords] of Object.entries(MATERIAL_KEYWORDS)) {
    const allKeywords = [
      ...keywords.types,
      ...keywords.variations,
      ...keywords.synonyms
    ];

    if (allKeywords.some(keyword => {
      // Check for exact matches
      if (words.includes(keyword) || queryLower.includes(keyword)) {
        return true;
      }
      // Check for partial matches
      if (keyword.split(' ').some(word => 
        words.some(w => w.includes(word) || word.includes(w))
      )) {
        return true;
      }
      // Check for context matches
      if (keywords.variations.some(variation => 
        queryLower.includes(variation.replace(' ', '')) || 
        queryLower.includes(variation.split(' ').join(''))
      )) {
        return true;
      }
      return false;
    })) {
      foundMaterials.push(material);
    }
  }

  return foundMaterials;
};

// Helper function to extract product types with variations
const extractProductTypes = (query) => {
  const foundTypes = [];
  const words = query.toLowerCase().split(/\s+/);
  const queryLower = query.toLowerCase();

  for (const [type, keywords] of Object.entries(PRODUCT_TYPE_KEYWORDS)) {
    const allKeywords = [
      ...keywords.types,
      ...keywords.variations,
      ...keywords.synonyms
    ];

    if (allKeywords.some(keyword => {
      // Check for exact matches
      if (words.includes(keyword) || queryLower.includes(keyword)) {
        return true;
      }
      // Check for partial matches
      if (keyword.split(' ').some(word => 
        words.some(w => w.includes(word) || word.includes(w))
      )) {
        return true;
      }
      // Check for context matches
      if (keywords.variations.some(variation => 
        queryLower.includes(variation.replace(' ', '')) || 
        queryLower.includes(variation.split(' ').join(''))
      )) {
        return true;
      }
      return false;
    })) {
      foundTypes.push(type);
    }
  }

  return foundTypes;
};

// Helper function to build search criteria with context awareness
const buildSearchCriteria = (query, priceRange, materials, productTypes) => {
  // Define price keywords at the start of the function
  const priceKeywords = [
    ...PRICE_KEYWORDS.under,
    ...PRICE_KEYWORDS.above,
    ...PRICE_KEYWORDS.between,
    ...PRICE_KEYWORDS.and
  ];

  // Start with material-specific criteria if materials are mentioned
  if (materials.length > 0) {
    const materialCriteria = {
      $or: []
    };

    materials.forEach(material => {
      const materialKeywords = MATERIAL_KEYWORDS[material];
      if (materialKeywords) {
        // Add exact material match
        materialCriteria.$or.push(
          { name: { $regex: material, $options: 'i' } },
          { description: { $regex: material, $options: 'i' } }
        );

        // Add material types
        materialKeywords.types.forEach(type => {
          materialCriteria.$or.push(
            { name: { $regex: type, $options: 'i' } },
            { description: { $regex: type, $options: 'i' } }
          );
        });

        // Add material variations
        materialKeywords.variations.forEach(variation => {
          materialCriteria.$or.push(
            { name: { $regex: variation, $options: 'i' } },
            { description: { $regex: variation, $options: 'i' } }
          );
        });
      }
    });

    // Build the final criteria
    const finalCriteria = {
      $and: [
        materialCriteria // Material must be present
      ]
    };

    // Add other search terms if they exist
    const searchTerms = query.toLowerCase().split(/\s+/).filter(term => 
      !priceKeywords.includes(term.toLowerCase()) &&
      !materials.some(material => 
        MATERIAL_KEYWORDS[material]?.types.some(type => 
          type.toLowerCase() === term.toLowerCase()
        )
      )
    );

    if (searchTerms.length > 0) {
      const otherTermsCriteria = {
        $or: searchTerms.map(term => ({
          $or: [
            { name: { $regex: term, $options: 'i' } },
            { description: { $regex: term, $options: 'i' } }
          ]
        }))
      };
      finalCriteria.$and.push(otherTermsCriteria);
    }

    // Add product type search if specified
    if (productTypes.length > 0) {
      const typeCriteria = {
        $or: []
      };

      productTypes.forEach(type => {
        const typeKeywords = PRODUCT_TYPE_KEYWORDS[type];
        if (typeKeywords) {
          typeCriteria.$or.push(
            { name: { $regex: type, $options: 'i' } },
            { description: { $regex: type, $options: 'i' } }
          );
          typeKeywords.variations.forEach(variation => {
            typeCriteria.$or.push(
              { name: { $regex: variation, $options: 'i' } },
              { description: { $regex: variation, $options: 'i' } }
            );
          });
        }
      });

      finalCriteria.$and.push(typeCriteria);
    }

    // Add price filter if exists
    if (priceRange) {
      finalCriteria.$and.push({ price: priceRange });
    }

    return finalCriteria;
  }

  // If no materials specified, use general search
  const generalCriteria = {
    $or: []
  };

  // Add text search for all terms
  const searchTerms = query.toLowerCase().split(/\s+/).filter(term => 
    !priceKeywords.includes(term.toLowerCase())
  );

  searchTerms.forEach(term => {
    generalCriteria.$or.push(
      { name: { $regex: term, $options: 'i' } },
      { description: { $regex: term, $options: 'i' } }
    );
  });

  // Add product type search if specified
  if (productTypes.length > 0) {
    productTypes.forEach(type => {
      const typeKeywords = PRODUCT_TYPE_KEYWORDS[type];
      if (typeKeywords) {
        generalCriteria.$or.push(
          { name: { $regex: type, $options: 'i' } },
          { description: { $regex: type, $options: 'i' } }
        );
        typeKeywords.variations.forEach(variation => {
          generalCriteria.$or.push(
            { name: { $regex: variation, $options: 'i' } },
            { description: { $regex: variation, $options: 'i' } }
          );
        });
      }
    });
  }

  const finalCriteria = {
    $and: [
      { $or: generalCriteria.$or }
    ]
  };

  // Add price filter if exists
  if (priceRange) {
    finalCriteria.$and.push({ price: priceRange });
  }

  return finalCriteria;
};

// Main search function
export const searchProducts = async (req, res) => {
  try {
    // Verify database connection
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database connection not ready');
    }

    const { q: query } = req.query;
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    console.log('🔍 Processing search query:', query);

    // Extract search parameters
    const priceRange = extractPriceRange(query);
    const materials = extractMaterials(query);
    const productTypes = extractProductTypes(query);

    console.log('📊 Extracted search parameters:', {
      priceRange,
      materials,
      productTypes
    });

    // Build search criteria
    const searchCriteria = buildSearchCriteria(query, priceRange, materials, productTypes);

    // If we have product types, also search in categories
    if (productTypes.length > 0) {
      const categoryQuery = {
        $or: productTypes.map(type => ({
          name: { $regex: new RegExp(type, 'i') }
        }))
      };

      const matchingCategories = await Category.find(categoryQuery).select('_id');
      
      if (matchingCategories.length > 0) {
        searchCriteria.$and.push({
          category: { $in: matchingCategories.map(cat => cat._id) }
        });
      }
    }

    console.log('🔎 Final search criteria:', JSON.stringify(searchCriteria, null, 2));

    // Execute search
    const products = await Product.find(searchCriteria)
      .populate({
        path: 'category',
        select: 'name',
        options: { lean: true }
      })
      .select('-__v')
      .lean()
      .sort({ price: 1 }); // Sort by price ascending

    // Sort results by relevance
    const sortedProducts = products.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const aDesc = a.description.toLowerCase();
      const bDesc = b.description.toLowerCase();

      // If materials are specified, prioritize material matches
      if (materials.length > 0) {
        const getMaterialScore = (name, desc) => {
          return materials.reduce((score, material) => {
            const materialKeywords = MATERIAL_KEYWORDS[material];
            if (!materialKeywords) return score;

            // Check exact material match with word boundaries
            const exactMatch = new RegExp(`\\b${material}\\b`, 'i');
            if (exactMatch.test(name) || exactMatch.test(desc)) {
              score += 1000;
            }

            // Check material types
            materialKeywords.types.forEach(type => {
              const typeMatch = new RegExp(`\\b${type}\\b`, 'i');
              if (typeMatch.test(name) || typeMatch.test(desc)) {
                score += 500;
              }
            });

            // Check material variations
            materialKeywords.variations.forEach(variation => {
              const variationMatch = new RegExp(`\\b${variation}\\b`, 'i');
              if (variationMatch.test(name) || variationMatch.test(desc)) {
                score += 250;
              }
            });

            return score;
          }, 0);
        };

        const aScore = getMaterialScore(aName, aDesc);
        const bScore = getMaterialScore(bName, bDesc);

        if (aScore !== bScore) {
          return bScore - aScore; // Higher score first
        }

        // If material scores are equal, check if material appears in name
        const aNameHasMaterial = materials.some(material => 
          new RegExp(`\\b${material}\\b`, 'i').test(aName)
        );
        const bNameHasMaterial = materials.some(material => 
          new RegExp(`\\b${material}\\b`, 'i').test(bName)
        );

        if (aNameHasMaterial !== bNameHasMaterial) {
          return aNameHasMaterial ? -1 : 1;
        }
      }

      // Then sort by price
      return a.price - b.price;
    });

    console.log('✅ Found products:', sortedProducts.length);

    // Prepare response
    const response = {
      success: true,
      message: sortedProducts.length > 0 ? "Products found successfully" : "No products found matching your criteria",
      count: sortedProducts.length,
      searchParams: {
        query,
        priceRange,
        materials,
        productTypes
      },
      products: sortedProducts.map(product => ({
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category?.name,
        images: product.images,
        stock: product.stock
      }))
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('❌ Search error:', {
      message: error.message,
      stack: error.stack,
      query: req.query
    });

    res.status(500).json({
      success: false,
      message: "Error performing search",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 