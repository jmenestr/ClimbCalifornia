# == Schema Information
#
# Table name: features
#
#  id         :integer          not null, primary key
#  feature    :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Feature < ActiveRecord::Base
  has_many :adventure_features
end
